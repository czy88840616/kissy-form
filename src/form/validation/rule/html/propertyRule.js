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
        ProPertyRule.superclass.constructor.apply(self, args.slice(1));
    };

    S.extend(ProPertyRule, BaseRule, {
        validate:function () {
            var args = [].slice.call(arguments);
            return ProPertyRule.superclass.validate.apply(this, args);
        }
    });

    return ProPertyRule;

}, {
    requires:[
        '../base'
    ]
});