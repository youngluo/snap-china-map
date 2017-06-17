## snap-china-map

 `snap-china-map.js` 是基于 `snap.svg.js` 开发的一个中国地图的插件。目前只提供了一些基础功能。
 
 本插件默认内置了地图的 svg path 信息，格式为：
 
    [
        {
            "path": "M207.07534,121.66617c-0.85299,-0.72143 -0.79884,-0.66619 -1.32819,-0.81178 -0.52935,-0.14559 -1.07195,-0.0397 -1.91895,0.22491 -0.2117,0.2118 -0.4235,0.4235 -0.5823,0.6882 -0.847,0 -1.6939,0 -2.488,0.0529 0,-1.0057 -0.2117,-1.7468 0.847,-1.9057 0.3706,-0.3176 0.7411,-0.5822 1.1117,-0.8469 0.6352,-1.2705 -0.3177,-1.8528 -0.3177,-2.4351 0.7411,-0.4235 1.7999,-1.0587 2.4351,-1.6939 0.1588,-0.8999 0.0529,-1.1117 0.9528,-1.1117 0.2647,0.2647 0.5294,0.5294 0.847,0.7941 0.5823,0.0529 1.2175,0.1058 1.8528,0.1588 -0.3177,0.5293 -0.5294,2.6468 0.1058,3.7055 0.3176,0.0529 0.6353,0.1059 0.9529,0.1588 0.1588,0.1059 0.3176,0.2647 0.5293,0.4235 -1.55238,1.00558 -2.64701,0.89412 -2.99926,2.59837z",
            "name": "Beijing",
            "code": "110000"
        },
        ...
    ]
    
## 直接使用
    
    html:
    
    <div id="map"></div>
    <script src="./[path]/snap.svg.js"></script>
    <script src="./[path]/snap-china-map.js"></script>
    
    js:
    
     var map = Snap.chinaMap({
            id: 'map'
        });

        map.hover = function (path, label) {
            label.textContent += '--hahaha';
        }

## NPM

安装：｀npm i snapsvg snap-china-map -S｀
使用：
    import 'snap-china-map';
    var map = Snap.chinaMap({
            id: 'map'
        });
    
## 默认配置

- id {String}: 通过id指定一个元素去渲染地图；
- pathes {Array}: svg path 路径信息；
- width {Number}: 地图宽度，默认为指定元素的宽度；
- height {Number}: 地图高度，默认为指定元素的高度；
- backgroundColor {String}: 地图背景色，默认为 `#b1b1b1`；
- borderColor {String}: 地图分界线颜色，默认为 `#fff`；
- hoverColor {String}: hover 颜色，默认为 `#20bad6`；
- borderWidth {Number}: 地图分界线宽度，默认为 0.3；
- scale {Number}: 地图放大倍数，默认为 1.5。
 
## callback

### hover(path, label)

- path {DOM}: 当前移入的路径；
- label {DOM}: 移入时显示的提示框。

## method

### setColors(colors)

为路径设置背景色。

    示例：
    {
        '350000': '#2d6f3c',
        '710000': '#4fb967'
    }

- colors {object}: 键名为各省的地区编码。

### refresh()

刷新地图。

