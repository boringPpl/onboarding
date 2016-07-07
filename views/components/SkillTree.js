import React, { Component } from 'react'
import * as d3 from 'd3'

const fake = {
  'name': 'Eve',
  'children': [
    {
      'name': 'Cain'
    },
    {
      'name': 'Seth',
      'children': [
        {
          'name': 'Enos'
        },
        {
          'name': 'Noam'
        }
      ]
    }
  ]
}

class SkillTree extends Component {
  // static propTypes = {
  //   currentPage: PropTypes.number.isRequired,
  //   totalPages: PropTypes.number.isRequired,
  //   onPageClick: PropTypes.func
  // }

  componentDidMount () {
    let width = 800
    let height = 600

    const tree = d3.tree().size([height, width - 160])
    const svg = d3.select('#tree-container').append('svg')
      .attr('width', 800)
      .attr('height', 600)
      // .style('background', '#ccc')
      .call(d3.zoom().on('zoom', function () {
        svg.attr('transform', `translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`)
      }))
      .append('g')
      // .attr('transform', 'translate(40,0)')

    const root = d3.hierarchy(fake)

    // root.descendants().forEach(d => {
    //   d.y = d.depth * 80
    // })

    function update () {
      tree(root)

      const link = svg.selectAll('.link')
        .data(root.descendants().slice(1))
        .enter().append('path')
        .attr('class', 'link')
        .attr('d', d => `M${d.y},${d.x}  C${(d.y + d.parent.y) / 2},${d.x}  ${(d.y + d.parent.y) / 2},${d.parent.x}  ${d.parent.y},${d.parent.x}`)
        .style('fill', 'none')
        .style('stroke', '#999')
        .style('stroke-width', 3)
        // .style('stroke-opacity', 0.4)

      const node = svg.selectAll('.node')
        .data(root.descendants())
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y}, ${d.x})`)
        .style('cursor', 'pointer')
        .on('click', click)

      node.append('circle')
        .attr('r', 5)
        .style('fill', '#999')
        .style('stroke', '#efefef')
        .style('stroke-width', 3)

      node.append('text')
        .attr('dy', '.35em')
        .attr('x', d => d.children ? -13 : 13)
        .attr('text-anchor', d => d.children ? 'end' : 'start')
        .text(d => d.data.name)
        // .style('fill-opacity', 1)
        .style('text-shadow', '2px 0 0 #efefef, -2px 0 0 #efefef, 0 2px 0 #efefef, 0 -2px 0 #efefef')

      var t = d3.transition().duration(750)
      node.transition(t).attr('transform', d => 'translate(' + d.y + ',' + d.x + ')')
      link.transition(t).attr('d', d => `M${d.y},${d.x}  C${(d.y + d.parent.y) / 2},${d.x}  ${(d.y + d.parent.y) / 2},${d.parent.x}  ${d.parent.y},${d.parent.x}`)

      root.descendants().forEach(d => {
        d.x0 = d.x
        d.y0 = d.y
      })
    }

    function click (d) {
      if (d.children) {
        d._children = d.children
        d.children = null
      } else if (d._children) {
        d.children = d._children
        d._children = null
      }
      update()
    }

    update()
  }

  render () {
    return <div id='tree-container' style={{ width: 800, height: 600 }}></div>
  }
}

export default SkillTree
