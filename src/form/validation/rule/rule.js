/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
/**
 * @fileoverview ���������
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
KISSY.add(function(S, BaseRule, undefined) {

    /**
     * ���Թ���
     *
     * @param {String} ruleName
     * @param {Function} ruleBody
     * @param {Object} rule params and msg
     * @constructor
     */
    var Rule = function() {
        var self = this;
        var args = [].slice.call(arguments);
        if(!args.length) {
            S.log('please use a name to define rule');
            return;
        }
        self._name = args[0];
        var cfg = args[2]||{args:[]};

        self._initArgs = cfg.args;
        //_propertyValue��_el���Ҫ�޸ı���ͨ�����Ե��޸�
        Rule.superclass.constructor.apply(self, args.slice(1));
    };

    S.extend(Rule, BaseRule, {
        validate:function () {
            var self = this;
            if(S.isUndefined(arguments[0])) {
                return Rule.superclass.validate.apply(this, [S.one(self._el).val()].concat(self._initArgs));
            } else {
                //bugfix for no args input
                var args = [].slice.call(arguments);
                //һ�������ֵ֮�󣬱�ʾ��д��ʼ���Ĳ���
                self._initArgs = args;
                //����ǰԪ�ص�ֵ���ɵ�һ����������
                return Rule.superclass.validate.apply(this, [S.one(self._el).val()].concat(args));
            }
        }
    });

    return Rule;
}, {
    requires:[
        './base'
    ]
});