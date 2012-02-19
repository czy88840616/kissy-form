/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
KISSY.add(function (S, Event, Base, JSON, Factory, undefined) {

    var HTML_PROPERTY = ['required', 'pattern', 'max', 'min'],
        EMPTY ='',
        CONFIG_NAME = 'data-valid';

    var Field = function (el, validConfig) {
        var self = this;
        self._el = el = S.one(el);

        if (el && el.hasAttr(CONFIG_NAME)) {
            var cfg = el.attr('data-valid').replace(/'/g, '"');

            try {
                cfg = JSON.parse(cfg);
                validConfig = S.merge(validConfig, cfg);
            } catch(e) {
                S.log('data-valid json is invalid');
            }
        }

        self._cfg = validConfig || {};
        self._storage = {};

        self._init();

        Field.superclass.constructor.call(self);
    };

    S.extend(Field, Base, {
        _init:function () {
            var self = this,
                _cfg = self._cfg,
                _el = self._el;

            var factory = new Factory();
            //add html property
            S.each(HTML_PROPERTY, function (item) {
                if (_el.hasAttr(item)) {
                    self.add(item, factory.create(item, {
                        //属性的value必须在这里初始化
                        args: [_el.attr(item), _el.val()]
                    }));
                }
            });

            //element event bind
            Event.on(_el, _cfg.eventType || 'blur', function (ev) {
                self.validate('', _el.val());
            });
        },

        add:function (name, rule) {
            var _storage = this._storage;
            _storage[name] = rule;
        },

        remove: function(name) {
            var _storage = this._storage;
            delete _storage[name];
        },

        validate:function (name, args) {
            var result = true, self = this, _storage = self._storage;

            if (name) {
                return _storage[name].validate(args);
            }

            for (var key in _storage) {
                if (!_storage[key].validate(args)) {
                    result = false;
                }
            }

            return result;
        }
    });

    return Field;
}, {
    requires:[
        'event',
        'base',
        'json',
        '../rule/html/propertyFactory'
    ]
});