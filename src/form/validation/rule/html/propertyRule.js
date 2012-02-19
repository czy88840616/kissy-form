/**
 * @fileoverview 基于html属性的规则抽象类
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
KISSY.add(function(S, BaseRule, undefined) {
    var ProPertyRule = function() {
        var self = this;
        var args = [].slice.call(arguments);
        if(!args.length) {
            S.log('please use a name to define property');
            return;
        }
        self._name = args[0];
        var cfg = args[2]||{args:[]};

        self._initArgs = cfg.args;
        ProPertyRule.superclass.constructor.apply(self, args.slice(1));
    };

    S.extend(ProPertyRule, BaseRule, {
        validate:function () {
            var self = this;
            if(S.isUndefined(arguments[0])) {
                return ProPertyRule.superclass.validate.apply(this);
            } else {
                //bugfix for no args input
                var args = [].slice.call(arguments);
                //将属性的value作为第一个参数传进去
                if(self._initArgs.length) {
                    args = [self._initArgs[0]].concat(args);
                }

                return ProPertyRule.superclass.validate.apply(this, args);
            }
        }
    });

    return ProPertyRule;
}, {
    requires:[
        '../base'
    ]
});