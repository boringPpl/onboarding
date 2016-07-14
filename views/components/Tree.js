import React, { Component, PropTypes } from 'react'
import { grey500, grey200 } from 'material-ui/styles/colors'
import * as d3 from 'd3'

const styles = {
  svg: {
    width: '100%',
    height: '100%'
  },
  circle: {
    fill: grey500,
    stroke: grey200,
    strokeWidth: 3
  },
  text: {
    textShadow: '5px 0 5px #fff, -5px 0 5px #fff, 0 5px 5px #fff, 0 -5px 5px #fff'
  },
  link: {
    fill: 'none',
    stroke: grey500,
    strokeWidth: 2,
    strokeOpacity: 0.4
  }
}

class Tree extends Component {
  static propTypes = {
    dataSource: PropTypes.object.isRequired,
    onNodeClick: PropTypes.func,
    style: PropTypes.object
  }

  componentDidMount () {
    this._generate(this.props.dataSource)
  }

  _generate = (data) => {
    const { width, height } = styles.svg
    const {
      offsetWidth: wrapperWidth,
      offsetHeight: wrapperHeight
    } = this.wrapper

    this.tree = d3.tree().size([wrapperHeight, wrapperWidth])
    this.zoom = d3.zoom().on('zoom', this._handleZoom)
    this.transition = d3.transition().duration(500)
    this.svg = d3.select(this.wrapper).append('svg')
      .attr('width', width)
      .attr('height', height)
      .call(this.zoom)
    this.container = this.svg.append('g')
    this.root = d3.hierarchy(data)
    this.root.x0 = wrapperHeight / 2
    this.root.y0 = 0

    this._update(this.root)
    this._center(this.root)
  }

  _update = (source) => {
    this.tree(this.root)
    this.root.descendants().forEach(d => { d.y = d.depth * 80 })

    const link = this.container.selectAll('path.link')
      .data(this.root.descendants().slice(1))

    const linkEnter = link.enter().append('path')
      .attr('class', 'link')
      .attr('d', d => this._diagonal({ x: source.x0, y: source.y0 }, { x: source.x0, y: source.y0 }))
      .style('fill', styles.link.fill)
      .style('stroke', styles.link.stroke)
      .style('stroke-width', styles.link.strokeWidth)
      .style('stroke-opacity', styles.link.strokeOpacity)

    linkEnter.merge(link)
      .transition(this.transition)
      .attr('d', d => this._diagonal(d, d.parent))

    link.exit()
      .transition(this.transition)
      .attr('d', d => this._diagonal(source, source))
      .remove()

    const node = this.container.selectAll('g.node')
      .data(this.root.descendants())

    const nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${source.y0}, ${source.x0})`)
      .style('cursor', 'pointer')
      .on('click', this._handleNodeClick)

    nodeEnter.append('circle')
      .attr('r', 0)
      .style('fill', styles.circle.fill)
      .style('stroke', styles.circle.stroke)
      .style('stroke-width', styles.circle.strokeWidth)

    nodeEnter.append('text')
      .attr('dy', '.35em')
      .attr('x', d => d.children || d._children ? -13 : 13)
      .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
      .text(d => d.data.name)
      .style('fill-opacity', 0)
      .style('text-shadow', styles.text.textShadow)

    const nodeUpdate = nodeEnter.merge(node).transition(this.transition)

    nodeUpdate
      .attr('transform', d => `translate(${d.y}, ${d.x})`)

    nodeUpdate
      .select('circle')
      .attr('r', 4)

    nodeUpdate
      .select('text')
      .style('fill-opacity', 1)

    const nodeExit = node.exit().transition(this.transition).remove()

    nodeExit
      .attr('transform', d => `translate(${source.y}, ${source.x})`)

    nodeExit
      .select('circle')
      .attr('r', 0)

    nodeExit
      .select('text')
      .style('fill-opacity', 0)

    this.root.descendants().forEach(d => {
      d.x0 = d.x
      d.y0 = d.y
    })
  }

  _diagonal = (source, target) => `M${source.y},${source.x}  C${(source.y + target.y) / 2},${source.x}  ${(source.y + target.y) / 2},${target.x}  ${target.y},${target.x}`

  _handleZoom = _ => {
    this.container
      .attr('transform', `translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`)
  }

  _center = node => {
    const transform = d3.zoomIdentity.translate(this.wrapper.offsetWidth / 2 - node.y, this.wrapper.offsetHeight / 2 - node.x).scale(1)
    this.zoom.transform(this.svg.transition(this.transition), transform)
  }

  _handleNodeClick = d => {
    if (d.children) {
      d._children = d.children
      d.children = null
    } else if (d._children) {
      d.children = d._children
      d._children = null
    }
    this._update(d)
    this._center(d)
    this.props.onNodeClick && this.props.onNodeClick(d)
  }

  render () {
    return (
      <div
        ref={node => { this.wrapper = node }}
        style={{
          width: '100%',
          height: 480,
          overflow: 'hidden',
          ...this.props.style
        }}
      />
    )
  }
}

export default Tree
