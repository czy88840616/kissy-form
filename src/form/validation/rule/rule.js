/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
/**
 * @fileoverview 规则抽象类
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
KISSY.add(function(S, BaseRule, undefined) {

    /**
     * 属性规则
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
        //_propertyValue和_el如果要修改必须通过属性的修改
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
                //一旦传入过值之后，表示复写初始化的参数
                self._initArgs = args;
                //将当前元素的值当成第一个参数传入
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