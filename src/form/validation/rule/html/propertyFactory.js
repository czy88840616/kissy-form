/**
 * @fileoverview html ���Թ��򹤳�
 * @author ��ͦ <zhangting@taobao.com>
 *
 */
KISSY.add(function(S, Base, PropertyRule, undefined) {
    var RuleFactory = function() {
        var self = this;
        RuleFactory.superclass.constructor.call(self);
    };

    //��һ������һ�������Ե�value������Ĳ��������Ĳ���
    S.mix(RuleFactory, {
        required :function(pv, value) {
            return !!value;
        },
        pattern: function(pv, value) {
            return new RegExp(pv).test(value);
        }
        //TODO add another rule
    });


    S.extend(RuleFactory, Base, {
        create: function(ruleName, cfg) {
            return new PropertyRule(ruleName, RuleFactory[ruleName], cfg);
        }
    });

    return RuleFactory;

}, {
    requires:[
        'base',
        './propertyRule'
    ]
});