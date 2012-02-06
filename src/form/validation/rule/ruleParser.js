/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
KISSY.add(function (S, RuleBase) {
    var parser = function () {

        var self = this;

        self.ruleStore = {};
    };

    S.augment(parser, {

        add:function (ruleName, rule, values) {
            var newRule, fn, params, key;

            if(S.isFunction(ruleName)) {
                fn = ruleName;
                params = rule;
                key = 'rule_' + S.guid();
            } else {
                key = ruleName;
                fn = rule;
                params = values;
            }

            this.ruleStore[key] = S.mix(RuleBase, {
                validate: fn,
                ruleName: key,
                params: params
            });
        },

        validateAll:function () {
            var result = [];
            for (var idx in self.ruleStore) {
                result.push(self.ruleStore[idx].validate());
            }

            return S.reduce(result, function (previousValue, currentValue, index, array) {
                return previousValue && currentValue;
            });
        },

        get:function(ruleName) {
            return this.ruleStore[ruleName];
        }
    });

    return parser;
}, {
    requires:[
        './base'
    ]
});