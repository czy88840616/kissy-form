/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
KISSY.add(function (S, Event, RuleParser) {

    var Field = function () {
        var self = this;
        self.ruleParser = new RuleParser();
    };

    S.augment(Field, {
        validate:function () {
            var self = this;
            var res = self.ruleParser.validateAll();
            if (res) {
                self.fire('pass');
            } else {
                self.fire('fail')
            }
        },

        get:function (ruleName) {
            return this.ruleParser.get(ruleName);
        },

        validateOnce:function (ruleName) {
            var rule = this.ruleParser.get(ruleName);
            if (rule) {
                return rule.validate();
            }
        }
    });

    S.augment(Field, S.EventTarget);

    return Field;
}, {
    requires:[
        'event',
        'form/validation/rule/ruleParser'
    ]
});