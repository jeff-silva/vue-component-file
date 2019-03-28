Vue.componentFile = function(tagname, file) {
    Vue.component(tagname, function (resolve, reject) {
        var $ = jQuery;
        $.get(file, function(resp) {

            var _templates={}, _function="", _style="", _assets=[];

            var _componentInit = function() {
                var func = new Function(_function.replace('export default', 'return'));
                var component = func.call(this);
                component.template = "#"+tagname;
                resolve(component);

                $("body").append("<style>"+_style+"</style>");
            };

            $('<div>'+ resp +'</div>').find("script, link, style, template").each(function() {
                if (this.tagName=="SCRIPT") {
                    if (this.src) {
                        var asset = document.createElement('script');
                        asset.src = this.src;
                        _assets.push(asset);
                    }
                    else {
                        _function += this.innerHTML;
                    }
                }

                else if (this.tagName=="LINK") {
                    if (this.href) {
                        var asset = document.createElement('link');
                        asset.rel = "stylesheet";
                        asset.href = this.href;
                        _assets.push(asset);
                    }
                }

                else if (this.tagName=="STYLE") {
                    _style += this.innerHTML;
                }

                else if (this.tagName=="TEMPLATE") {
                    var templateId = this.id || tagname;
                    _templates[templateId] = _templates[templateId]? _templates[templateId]: "";
                    _templates[templateId] += this.innerHTML;
                }
            });

            for(var i in _templates) {
                $("#"+i).remove();
                $("body").append(`<template id="${i}">${_templates[i]}</template>`);
            }


            if (_assets.length>0) {
                var _assetLoad = function(index) {
                    if (typeof _assets[index] =="undefined") {
                        return _componentInit();
                    }
                    _assets[index].onload = function() {
                        _assetLoad(index+1);
                    };
                    document.head.appendChild(_assets[index]);
                };
                return _assetLoad(0);
            }

            _componentInit();
        });
    });
};
