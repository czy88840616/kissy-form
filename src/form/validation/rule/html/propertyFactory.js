/**
 * @fileoverview html 属性规则工厂
 * @author 张挺 <zhangting@taobao.com>
 *
 */
KISSY.add(function(S, Base, PropertyRule, undefined) {
    var RuleFactory = function() {
        var self = this;
        RuleFactory.superclass.constructor.call(self);
    };

    S.extend(RuleFactory, Base, {
        _init: function() {

        }
    });

    return RuleFactory;

}, {
    requires:[
        'base',
        './propertyRule'
    ]
});