/**
 * @fileoverview ���й���Ļ���
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
KISSY.add(function(S, Base, undefined) {

    var RULE_SUCCESS = 'success',
        RULE_ERROR = 'error',
        DEFAULT_MSG = {
            success:'',
            error:''
        };

    var BaseRule = function() {
        var args = [].slice.call(arguments),
            self = this;

        self.validation = args[0] ? args[0]:function() {return true};

        var cfg = S.merge({}, args[1]);

        if(args[1]) {
            self._args = S.isArray(cfg['args']) ? cfg['args'] : [cfg['args']];
        }

        self._msg = S.merge(DEFAULT_MSG, cfg['msg']);

        BaseRule.superclass.constructor.call(self);
    };

    S.extend(BaseRule, Base, {
        validate: function() {
            var self = this;

            var args = [].slice.call(arguments);
            var validated = self.validation.apply(self, args.length ? args: self._args);

            var msg;
            if(self._msg) {
                msg = validated ? self._msg[RULE_SUCCESS] : self._msg[RULE_ERROR];
            } else {
                msg = validated ? self._msg[RULE_SUCCESS] : '';
            }

            self.fire(validated ? RULE_SUCCESS:RULE_ERROR, {
                msg:msg
            });

            self.fire('validate', {
                result: validated,
                msg: msg
            });

            return validated;
        },

        onSuccess:function(success) {
            this.on(RULE_SUCCESS, success);
            return this;
        },

        onError:function(error) {
            this.on(RULE_ERROR, error);
            return this;
        },

        onValidate: function(validate) {
            this.on('validate', validate);
            return this;
        }
    }, {
        ATTRS: {
            msg:{
                value:'',
                setter:function(msg) {
                    this._msg = S.merge(this._msg, msg);
                }
            }
        }
    });

    return BaseRule;
}, {
    requires:[
        'base'
    ]
});