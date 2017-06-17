import pathes from './pathes';
import util from './util';
import './index.css';

const doc = window.document;

Snap.plugin((Snap, Element, Paper, glob, Fragment) => {
    class Map {
        constructor(options) {
            this._init(options);
            //callback
            this.hover = function () { };

            return this;
        }

        _init(options) {
            this.wrapperDom = doc.getElementById(options.id);
            this.wrapperDom.style.position = 'relative';

            const defaultOptions = {
                pathes,
                width: this.wrapperDom.scrollWidth,
                height: this.wrapperDom.scrollHeight,
                backgroundColor: '#b1b1b1',
                borderColor: '#fff',
                borderWidth: 0.3,
                scale: 1.5,
                hoverColor: '#20bad6'
            }

            this.options = util.merge(defaultOptions, options);
            this.svg = Snap(this.options.width, this.options.height);
            this.svg.appendTo(this.wrapperDom);
            this._drawMap();
            this.label = this._createLabel();
        }

        _drawMap() {
            const pathes = this.options.pathes,
                g = this.svg.g();

            pathes.forEach(path => {
                g.add(this.svg.path(path));
            });

            g.attr({
                fill: this.options.backgroundColor,
                stroke: this.options.borderColor,
                strokeWidth: this.options.borderWidth
            })
                .mousemove(this._setLabelPosition, this)
                .hover(this._hoverInFn, this._hoverOutFn, this);

            const gBox = g.getBBox(),
                x = (this.options.width - gBox.width * this.options.scale) / 2 - gBox.x * this.options.scale,
                y = (this.options.height - gBox.height * this.options.scale) / 2 - gBox.y * this.options.scale;

            g.transform('translate(' + x + ',' + y + ') scale(' + this.options.scale + ')');
        }

        _createLabel() {
            let label = doc.createElement('div')
            label.className = 'china-map-label';
            label.style.position = 'absolute';
            label.style.visibility = 'hidden';
            this.wrapperDom.appendChild(label);

            return label;
        }

        _setLabelPosition(e) {
            const { left, top } = util.getElementAbsolutePos(this.wrapperDom);
            const margin = 5;

            this.label.style.left = e.pageX - left - this.label.offsetWidth - margin + 'px';
            this.label.style.top = e.pageY - top - this.label.offsetHeight - margin + 'px';
        }

        _hoverInFn(e) {
            const path = Snap(e.target);

            if (path.data('isSetColor')) {
                path.data('color', path.attr('fill'))
                    .removeData('isSetColor')
            }
            path.attr({
                fill: this.options.hoverColor
            });
            this.label.textContent = path.attr('name');
            this.label.style.visibility = 'visible';
            this.hover(path, this.label);
        }

        _hoverOutFn(e) {
            const path = Snap(e.target);
            const fill = path.data('color') ? path.data('color') : this.options.backgroundColor;

            this.label.style.visibility = 'hidden';
            path.attr({ fill });
        }

        setColors(colors) {
            if (!Snap.is(colors, 'object') || util.isEmptyObject(colors)) {
                return false;
            }

            const paths = this.svg.selectAll('path');
            for (let code in colors) {
                paths.forEach(path => {
                    if (code == path.attr('code')) {
                        path
                            .attr({
                                fill: colors[code]
                            })
                            .data('isSetColor', true);
                        return false;
                    }
                });
            }

            return this;
        }

        refresh() {
            this.svg.clear();
            this._drawMap();

            return this;
        }
    }

    Snap.chinaMap = options => {
        if (!options.id) {
            throw new Error('must specify id');
        }
        return new Map(options);
    };
});