/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
KISSY.add(function(S, Event) {

    var RULE_SUCCESS = 'success',
        RULE_ERROR = 'error';

    var BaseRule = function() {
        var args = [].slice.call(arguments),
            self = this;

        self.validation = args[0] ? args[0]:function() {return true};

        self._msg = args[1]&&S.isArray(args[1])?args[1]:[];

    };

    S.augment(BaseRule, S.EventTarget, {
        validate: function() {
            var self = this;

            var args = [].slice.call(arguments);
            var validated = self.validation.apply(self, args);

            var msg;
            if(self._msg.length>1) {
                msg = validated ? self._msg[0] : self._msg[1];
            } else {
                msg = validated ? self._msg[0] : '';
            }

            self.fire(validated ? RULE_SUCCESS:RULE_ERROR, {
                msg:msg
            });

            return validated;
        },

        onSuccess:function(success) {
            this.on('RULE_SUCCESS', success);
            return this;
        },

        onError:function(error) {
            this.on('RULE_ERROR', error);
            return this;
        }
    });

    return BaseRule;
}, {
    requires:[
        'event'
    ]
});