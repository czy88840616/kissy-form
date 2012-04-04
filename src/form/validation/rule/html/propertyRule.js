/**
 * @fileoverview ����html���ԵĹ��������
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
        //_propertyValue��_el���Ҫ�޸ı���ͨ�����Ե��޸�
        self._propertyValue = cfg.propertyValue;
        self._el = cfg.el;
        ProPertyRule.superclass.constructor.apply(self, args.slice(1));
    };

    S.extend(ProPertyRule, BaseRule, {
        validate:function () {
            var self = this;
            if(S.isUndefined(arguments[0])) {
                return ProPertyRule.superclass.validate.apply(this, [self._propertyValue, S.one(self._el).val()].concat(self._initArgs));
            } else {
                //bugfix for no args input
                var args = [].slice.call(arguments);
                //һ�������ֵ֮�󣬱�ʾ��д��ʼ���Ĳ���
                self._initArgs = args;
                //�����Ե�value��Ϊ��һ����������ȥ������ǰԪ�ص�ֵ���ɵڶ�����������
                return ProPertyRule.superclass.validate.apply(this, [self._propertyValue, S.one(self._el).val()].concat(args));
            }
        }
    });

    return ProPertyRule;
}, {
    requires:[
        '../base'
    ]
});