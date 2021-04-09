import _ from 'lodash'
export function formatterRouter(router) {
  router.forEach((item, index) => {
    if ((!item.id || !item.label) && item.meta) {
      item.id = index
      item.label = item.meta.title
    }
    if (item.children && item.children.length > 1) {
      formatterRouter(item.children)
    }
  })
  return router
}
function toPercent(point) {
  var str = Number(point * 100).toFixed(1)
  str += '%'
  return str
}
export const statusEcharts = (data = [], name = '') => {
  let grbyResult = _.groupBy(data, 'delStatus')
  let tems = [
    {
      name: '已交付',
      value: 0,
    },
    {
      name: '未交付',
      value: 0,
    },
  ]

  Object.keys(grbyResult).forEach((item, index) => {
    if (item == null || item == 0 || item == 'null') {
      tems[0].value += grbyResult[item].length
    } else {
      tems[1].value += grbyResult[item].length
    }
  })

  let status = {
    normal: {
      color: '#2F8DF4',
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
    },
  }
  let total = 0
  let status1 = {
    normal: {
      color: '#FC4567',
    },
  }

  tems.forEach((item) => {
    console.log(item)
    if (item.name === '已交付') {
      item.itemStyle = status
    } else {
      item.itemStyle = status1
    }
    total += item.value
  })

  console.log(total)

  let option = {
    title: {
      subtext: toPercent(tems[0].value / total),
      subtextStyle: {
        fontSize: 20,
      },
      text: name,
      x: 'center',
      y: 'center',
    },
    tooltip: {
      formatter: function(params) {
        return `${params.name}:${params.data.value}辆 占比:${params.percent} %`
      },
    },
    legend: {
      show: true,
      itemGap: 12,
      data: ['已交付', '未交付'],
    },

    series: [
      {
        name: 'circle',
        type: 'pie',
        clockWise: true,
        radius: ['50%', '66%'],
        itemStyle: {
          normal: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
        },
        hoverAnimation: false,
        data: tems,
      },
    ],
  }
  return option
}
