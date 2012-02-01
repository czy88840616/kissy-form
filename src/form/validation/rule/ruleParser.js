/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
KISSY.add(function(S, RuleBase) {
    var parser = function() {

        this.mergeRule = function(rule) {
            var newRule;

            if(S.isFunction(rule)) {
                newRule = {};
                newRule.validate = rule;
            } else {
                newRule = rule;
            }

            S.extends(newRule, RuleBase);

        }
    };

    return parser;
}, {
    requires:[
        './base'
    ]
});