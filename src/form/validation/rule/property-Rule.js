/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
KISSY.add(function(S, BaseRule, undefined) {
    var ProPertyRule = function(name, value) {
        var self = this;
        ProPertyRule.superclass.constructor.call(self);

        self._name = name;
        self._value = value;
    };

    S.extend(ProPertyRule, BaseRule, {
        validate:function () {
            var args = [].slice.call(arguments);
            ProPertyRule.superclass.validate.apply(this, args);
        }
    });

}, {
    requires:[
        './base'
    ]
});