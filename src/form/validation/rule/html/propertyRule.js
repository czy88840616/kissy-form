/**
 * @fileoverview ����html���ԵĹ��������
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
            return ProPertyRule.superclass.validate.apply(this, arguments);
        }
    });

    return ProPertyRule;

}, {
    requires:[
        '../base'
    ]
});