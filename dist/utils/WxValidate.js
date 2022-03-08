'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 表单验证
 *
 * @param {Object} rules 验证字段的规则
 * @param {Object} messages 验证字段的提示信息
 *
 */
var WxValidate = function () {
    function WxValidate() {
        var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, WxValidate);

        Object.assign(this, {
            data: {},
            rules: rules,
            messages: messages
        });
        this.__init();
    }

    /**
     * __init
     */


    _createClass(WxValidate, [{
        key: '__init',
        value: function __init() {
            this.__initMethods();
            this.__initDefaults();
            this.__initData();
        }

        /**
         * 初始化数据
         */

    }, {
        key: '__initData',
        value: function __initData() {
            this.form = {};
            this.errorList = [];
        }

        /**
         * 初始化默认提示信息
         */

    }, {
        key: '__initDefaults',
        value: function __initDefaults() {
            this.defaults = {
                messages: {
                    required: '这是必填字段。',
                    email: '请输入有效的电子邮件地址。',
                    tel: '请输入11位的手机号码。',
                    url: '请输入有效的网址。',
                    date: '请输入有效的日期。',
                    dateISO: '请输入有效的日期（ISO），例如：2009-06-23，1998/01/22。',
                    number: '请输入有效的数字。',
                    digits: '只能输入数字。',
                    idcard: '请输入18位的有效身份证。',
                    equalTo: this.formatTpl('输入值必须和 {0} 相同。'),
                    contains: this.formatTpl('输入值必须包含 {0}。'),
                    minlength: this.formatTpl('最少要输入 {0} 个字符。'),
                    maxlength: this.formatTpl('最多可以输入 {0} 个字符。'),
                    rangelength: this.formatTpl('请输入长度在 {0} 到 {1} 之间的字符。'),
                    min: this.formatTpl('请输入不小于 {0} 的数值。'),
                    max: this.formatTpl('请输入不大于 {0} 的数值。'),
                    range: this.formatTpl('请输入范围在 {0} 到 {1} 之间的数值。')
                }
            };
        }

        /**
         * 初始化默认验证方法
         */

    }, {
        key: '__initMethods',
        value: function __initMethods() {
            var that = this;
            that.methods = {
                /**
                 * 验证必填元素
                 */
                required: function required(value, param) {
                    if (!that.depend(param)) {
                        return 'dependency-mismatch';
                    } else if (typeof value === 'number') {
                        value = value.toString();
                    } else if (typeof value === 'boolean') {
                        return !0;
                    }

                    return value.length > 0;
                },

                /**
                 * 验证电子邮箱格式
                 */
                email: function email(value) {
                    return that.optional(value) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
                },

                /**
                 * 验证手机格式
                 */
                tel: function tel(value) {
                    return that.optional(value) || /^1[34578]\d{9}$/.test(value);
                },

                /**
                 * 验证URL格式
                 */
                url: function url(value) {
                    return that.optional(value) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
                },

                /**
                 * 验证日期格式
                 */
                date: function date(value) {
                    return that.optional(value) || !/Invalid|NaN/.test(new Date(value).toString());
                },

                /**
                 * 验证ISO类型的日期格式
                 */
                dateISO: function dateISO(value) {
                    return that.optional(value) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
                },

                /**
                 * 验证十进制数字
                 */
                number: function number(value) {
                    return that.optional(value) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
                },

                /**
                 * 验证整数
                 */
                digits: function digits(value) {
                    return that.optional(value) || /^\d+$/.test(value);
                },

                /**
                 * 验证身份证号码
                 */
                idcard: function idcard(value) {
                    return that.optional(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
                },

                /**
                 * 验证两个输入框的内容是否相同
                 */
                equalTo: function equalTo(value, param) {
                    return that.optional(value) || value === that.data[param];
                },

                /**
                 * 验证是否包含某个值
                 */
                contains: function contains(value, param) {
                    return that.optional(value) || value.indexOf(param) >= 0;
                },

                /**
                 * 验证最小长度
                 */
                minlength: function minlength(value, param) {
                    return that.optional(value) || value.length >= param;
                },

                /**
                 * 验证最大长度
                 */
                maxlength: function maxlength(value, param) {
                    return that.optional(value) || value.length <= param;
                },

                /**
                 * 验证一个长度范围[min, max]
                 */
                rangelength: function rangelength(value, param) {
                    return that.optional(value) || value.length >= param[0] && value.length <= param[1];
                },

                /**
                 * 验证最小值
                 */
                min: function min(value, param) {
                    return that.optional(value) || value >= param;
                },

                /**
                 * 验证最大值
                 */
                max: function max(value, param) {
                    return that.optional(value) || value <= param;
                },

                /**
                 * 验证一个值范围[min, max]
                 */
                range: function range(value, param) {
                    return that.optional(value) || value >= param[0] && value <= param[1];
                }
            };
        }

        /**
         * 添加自定义验证方法
         * @param {String} name 方法名
         * @param {Function} method 函数体，接收两个参数(value, param)，value表示元素的值，param表示参数
         * @param {String} message 提示信息
         */

    }, {
        key: 'addMethod',
        value: function addMethod(name, method, message) {
            this.methods[name] = method;
            this.defaults.messages[name] = message !== undefined ? message : this.defaults.messages[name];
        }

        /**
         * 判断验证方法是否存在
         */

    }, {
        key: 'isValidMethod',
        value: function isValidMethod(value) {
            var methods = [];
            for (var method in this.methods) {
                if (method && typeof this.methods[method] === 'function') {
                    methods.push(method);
                }
            }
            return methods.indexOf(value) !== -1;
        }

        /**
         * 格式化提示信息模板
         */

    }, {
        key: 'formatTpl',
        value: function formatTpl(source, params) {
            var that = this;
            if (arguments.length === 1) {
                return function () {
                    var args = Array.from(arguments);
                    args.unshift(source);
                    return that.formatTpl.apply(this, args);
                };
            }
            if (params === undefined) {
                return source;
            }
            if (arguments.length > 2 && params.constructor !== Array) {
                params = Array.from(arguments).slice(1);
            }
            if (params.constructor !== Array) {
                params = [params];
            }
            params.forEach(function (n, i) {
                source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                    return n;
                });
            });
            return source;
        }

        /**
         * 判断规则依赖是否存在
         */

    }, {
        key: 'depend',
        value: function depend(param) {
            switch (typeof param === 'undefined' ? 'undefined' : _typeof(param)) {
                case 'boolean':
                    param = param;
                    break;
                case 'string':
                    param = !!param.length;
                    break;
                case 'function':
                    param = param();
                default:
                    param = !0;
            }
            return param;
        }

        /**
         * 判断输入值是否为空
         */

    }, {
        key: 'optional',
        value: function optional(value) {
            return !this.methods.required(value) && 'dependency-mismatch';
        }

        /**
         * 获取自定义字段的提示信息
         * @param {String} param 字段名
         * @param {Object} rule 规则
         */

    }, {
        key: 'customMessage',
        value: function customMessage(param, rule) {
            var params = this.messages[param];
            var isObject = (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object';
            if (params && isObject) return params[rule.method];
        }

        /**
         * 获取某个指定字段的提示信息
         * @param {String} param 字段名
         * @param {Object} rule 规则
         */

    }, {
        key: 'defaultMessage',
        value: function defaultMessage(param, rule) {
            var message = this.customMessage(param, rule) || this.defaults.messages[rule.method];
            var type = typeof message === 'undefined' ? 'undefined' : _typeof(message);

            if (type === 'undefined') {
                message = 'Warning: No message defined for ' + rule.method + '.';
            } else if (type === 'function') {
                message = message.call(this, rule.parameters);
            }

            return message;
        }

        /**
         * 缓存错误信息
         * @param {String} param 字段名
         * @param {Object} rule 规则
         * @param {String} value 元素的值
         */

    }, {
        key: 'formatTplAndAdd',
        value: function formatTplAndAdd(param, rule, value) {
            var msg = this.defaultMessage(param, rule);

            this.errorList.push({
                param: param,
                msg: msg,
                value: value
            });
        }

        /**
         * 验证某个指定字段的规则
         * @param {String} param 字段名
         * @param {Object} rules 规则
         * @param {Object} data 需要验证的数据对象
         */

    }, {
        key: 'checkParam',
        value: function checkParam(param, rules, data) {

            // 缓存数据对象
            this.data = data;

            // 缓存字段对应的值
            var value = data[param] !== null && data[param] !== undefined ? data[param] : '';

            // 遍历某个指定字段的所有规则，依次验证规则，否则缓存错误信息
            for (var method in rules) {

                // 判断验证方法是否存在
                if (this.isValidMethod(method)) {

                    // 缓存规则的属性及值
                    var rule = {
                        method: method,
                        parameters: rules[method]

                        // 调用验证方法
                    };var result = this.methods[method](value, rule.parameters);

                    // 若result返回值为dependency-mismatch，则说明该字段的值为空或非必填字段
                    if (result === 'dependency-mismatch') {
                        continue;
                    }

                    this.setValue(param, method, result, value);

                    // 判断是否通过验证，否则缓存错误信息，跳出循环
                    if (!result) {
                        this.formatTplAndAdd(param, rule, value);
                        break;
                    }
                }
            }
        }

        /**
         * 设置字段的默认验证值
         * @param {String} param 字段名
         */

    }, {
        key: 'setView',
        value: function setView(param) {
            this.form[param] = {
                $name: param,
                $valid: true,
                $invalid: false,
                $error: {},
                $success: {},
                $viewValue: ''
            };
        }

        /**
         * 设置字段的验证值
         * @param {String} param 字段名
         * @param {String} method 字段的方法
         * @param {Boolean} result 是否通过验证
         * @param {String} value 字段的值
         */

    }, {
        key: 'setValue',
        value: function setValue(param, method, result, value) {
            var params = this.form[param];
            params.$valid = result;
            params.$invalid = !result;
            params.$error[method] = !result;
            params.$success[method] = result;
            params.$viewValue = value;
        }

        /**
         * 验证所有字段的规则，返回验证是否通过
         * @param {Object} data 需要验证数据对象
         */

    }, {
        key: 'checkForm',
        value: function checkForm(data) {
            this.__initData();

            for (var param in this.rules) {
                this.setView(param);
                this.checkParam(param, this.rules[param], data);
            }

            return this.valid();
        }

        /**
         * 返回验证是否通过
         */

    }, {
        key: 'valid',
        value: function valid() {
            return this.size() === 0;
        }

        /**
         * 返回错误信息的个数
         */

    }, {
        key: 'size',
        value: function size() {
            return this.errorList.length;
        }

        /**
         * 返回所有错误信息
         */

    }, {
        key: 'validationErrors',
        value: function validationErrors() {
            return this.errorList;
        }
    }]);

    return WxValidate;
}();

exports.default = WxValidate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIld4VmFsaWRhdGUuanMiXSwibmFtZXMiOlsiV3hWYWxpZGF0ZSIsInJ1bGVzIiwibWVzc2FnZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJkYXRhIiwiX19pbml0IiwiX19pbml0TWV0aG9kcyIsIl9faW5pdERlZmF1bHRzIiwiX19pbml0RGF0YSIsImZvcm0iLCJlcnJvckxpc3QiLCJkZWZhdWx0cyIsInJlcXVpcmVkIiwiZW1haWwiLCJ0ZWwiLCJ1cmwiLCJkYXRlIiwiZGF0ZUlTTyIsIm51bWJlciIsImRpZ2l0cyIsImlkY2FyZCIsImVxdWFsVG8iLCJmb3JtYXRUcGwiLCJjb250YWlucyIsIm1pbmxlbmd0aCIsIm1heGxlbmd0aCIsInJhbmdlbGVuZ3RoIiwibWluIiwibWF4IiwicmFuZ2UiLCJ0aGF0IiwibWV0aG9kcyIsInZhbHVlIiwicGFyYW0iLCJkZXBlbmQiLCJ0b1N0cmluZyIsImxlbmd0aCIsIm9wdGlvbmFsIiwidGVzdCIsIkRhdGUiLCJpbmRleE9mIiwibmFtZSIsIm1ldGhvZCIsIm1lc3NhZ2UiLCJ1bmRlZmluZWQiLCJwdXNoIiwic291cmNlIiwicGFyYW1zIiwiYXJndW1lbnRzIiwiYXJncyIsIkFycmF5IiwiZnJvbSIsInVuc2hpZnQiLCJhcHBseSIsImNvbnN0cnVjdG9yIiwic2xpY2UiLCJmb3JFYWNoIiwibiIsImkiLCJyZXBsYWNlIiwiUmVnRXhwIiwicnVsZSIsImlzT2JqZWN0IiwiY3VzdG9tTWVzc2FnZSIsInR5cGUiLCJjYWxsIiwicGFyYW1ldGVycyIsIm1zZyIsImRlZmF1bHRNZXNzYWdlIiwiaXNWYWxpZE1ldGhvZCIsInJlc3VsdCIsInNldFZhbHVlIiwiZm9ybWF0VHBsQW5kQWRkIiwiJG5hbWUiLCIkdmFsaWQiLCIkaW52YWxpZCIsIiRlcnJvciIsIiRzdWNjZXNzIiwiJHZpZXdWYWx1ZSIsInNldFZpZXciLCJjaGVja1BhcmFtIiwidmFsaWQiLCJzaXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztJQU9PQSxVO0FBQ0gsMEJBQXVDO0FBQUEsWUFBM0JDLEtBQTJCLHVFQUFuQixFQUFtQjtBQUFBLFlBQWZDLFFBQWUsdUVBQUosRUFBSTs7QUFBQTs7QUFDbkNDLGVBQU9DLE1BQVAsQ0FBYyxJQUFkLEVBQW9CO0FBQ2hCQyxrQkFBTSxFQURVO0FBRWhCSix3QkFGZ0I7QUFHaEJDO0FBSGdCLFNBQXBCO0FBS0EsYUFBS0ksTUFBTDtBQUNIOztBQUVEOzs7Ozs7O2lDQUdTO0FBQ0wsaUJBQUtDLGFBQUw7QUFDQSxpQkFBS0MsY0FBTDtBQUNBLGlCQUFLQyxVQUFMO0FBQ0g7O0FBRUQ7Ozs7OztxQ0FHYTtBQUNULGlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLGlCQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0g7O0FBRUQ7Ozs7Ozt5Q0FHaUI7QUFDYixpQkFBS0MsUUFBTCxHQUFnQjtBQUNaViwwQkFBVTtBQUNOVyw4QkFBVSxTQURKO0FBRU5DLDJCQUFPLGVBRkQ7QUFHTkMseUJBQUssY0FIQztBQUlOQyx5QkFBSyxXQUpDO0FBS05DLDBCQUFNLFdBTEE7QUFNTkMsNkJBQVMseUNBTkg7QUFPTkMsNEJBQVEsV0FQRjtBQVFOQyw0QkFBUSxTQVJGO0FBU05DLDRCQUFRLGVBVEY7QUFVTkMsNkJBQVMsS0FBS0MsU0FBTCxDQUFlLGdCQUFmLENBVkg7QUFXTkMsOEJBQVUsS0FBS0QsU0FBTCxDQUFlLGNBQWYsQ0FYSjtBQVlORSwrQkFBVyxLQUFLRixTQUFMLENBQWUsZ0JBQWYsQ0FaTDtBQWFORywrQkFBVyxLQUFLSCxTQUFMLENBQWUsaUJBQWYsQ0FiTDtBQWNOSSxpQ0FBYSxLQUFLSixTQUFMLENBQWUseUJBQWYsQ0FkUDtBQWVOSyx5QkFBSyxLQUFLTCxTQUFMLENBQWUsaUJBQWYsQ0FmQztBQWdCTk0seUJBQUssS0FBS04sU0FBTCxDQUFlLGlCQUFmLENBaEJDO0FBaUJOTywyQkFBTyxLQUFLUCxTQUFMLENBQWUseUJBQWY7QUFqQkQ7QUFERSxhQUFoQjtBQXFCSDs7QUFFRDs7Ozs7O3dDQUdnQjtBQUNaLGdCQUFNUSxPQUFPLElBQWI7QUFDQUEsaUJBQUtDLE9BQUwsR0FBZTtBQUNYOzs7QUFHQW5CLHdCQUpXLG9CQUlGb0IsS0FKRSxFQUlLQyxLQUpMLEVBSVk7QUFDbkIsd0JBQUksQ0FBQ0gsS0FBS0ksTUFBTCxDQUFZRCxLQUFaLENBQUwsRUFBeUI7QUFDckIsK0JBQU8scUJBQVA7QUFDSCxxQkFGRCxNQUVPLElBQUksT0FBT0QsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUNsQ0EsZ0NBQVFBLE1BQU1HLFFBQU4sRUFBUjtBQUNILHFCQUZNLE1BRUEsSUFBSSxPQUFPSCxLQUFQLEtBQWlCLFNBQXJCLEVBQWdDO0FBQ25DLCtCQUFPLENBQUMsQ0FBUjtBQUNIOztBQUVELDJCQUFPQSxNQUFNSSxNQUFOLEdBQWUsQ0FBdEI7QUFDSCxpQkFkVTs7QUFlWDs7O0FBR0F2QixxQkFsQlcsaUJBa0JMbUIsS0FsQkssRUFrQkU7QUFDVCwyQkFBT0YsS0FBS08sUUFBTCxDQUFjTCxLQUFkLEtBQXdCLHdJQUF3SU0sSUFBeEksQ0FBNklOLEtBQTdJLENBQS9CO0FBQ0gsaUJBcEJVOztBQXFCWDs7O0FBR0FsQixtQkF4QlcsZUF3QlBrQixLQXhCTyxFQXdCQTtBQUNQLDJCQUFPRixLQUFLTyxRQUFMLENBQWNMLEtBQWQsS0FBd0Isa0JBQWtCTSxJQUFsQixDQUF1Qk4sS0FBdkIsQ0FBL0I7QUFDSCxpQkExQlU7O0FBMkJYOzs7QUFHQWpCLG1CQTlCVyxlQThCUGlCLEtBOUJPLEVBOEJBO0FBQ1AsMkJBQU9GLEtBQUtPLFFBQUwsQ0FBY0wsS0FBZCxLQUF3QiwyY0FBMmNNLElBQTNjLENBQWdkTixLQUFoZCxDQUEvQjtBQUNILGlCQWhDVTs7QUFpQ1g7OztBQUdBaEIsb0JBcENXLGdCQW9DTmdCLEtBcENNLEVBb0NDO0FBQ1IsMkJBQU9GLEtBQUtPLFFBQUwsQ0FBY0wsS0FBZCxLQUF3QixDQUFDLGNBQWNNLElBQWQsQ0FBbUIsSUFBSUMsSUFBSixDQUFTUCxLQUFULEVBQWdCRyxRQUFoQixFQUFuQixDQUFoQztBQUNILGlCQXRDVTs7QUF1Q1g7OztBQUdBbEIsdUJBMUNXLG1CQTBDSGUsS0ExQ0csRUEwQ0k7QUFDWCwyQkFBT0YsS0FBS08sUUFBTCxDQUFjTCxLQUFkLEtBQXdCLCtEQUErRE0sSUFBL0QsQ0FBb0VOLEtBQXBFLENBQS9CO0FBQ0gsaUJBNUNVOztBQTZDWDs7O0FBR0FkLHNCQWhEVyxrQkFnREpjLEtBaERJLEVBZ0RHO0FBQ1YsMkJBQU9GLEtBQUtPLFFBQUwsQ0FBY0wsS0FBZCxLQUF3Qiw4Q0FBOENNLElBQTlDLENBQW1ETixLQUFuRCxDQUEvQjtBQUNILGlCQWxEVTs7QUFtRFg7OztBQUdBYixzQkF0RFcsa0JBc0RKYSxLQXRESSxFQXNERztBQUNWLDJCQUFPRixLQUFLTyxRQUFMLENBQWNMLEtBQWQsS0FBd0IsUUFBUU0sSUFBUixDQUFhTixLQUFiLENBQS9CO0FBQ0gsaUJBeERVOztBQXlEWDs7O0FBR0FaLHNCQTVEVyxrQkE0REpZLEtBNURJLEVBNERHO0FBQ1YsMkJBQU9GLEtBQUtPLFFBQUwsQ0FBY0wsS0FBZCxLQUF3QiwyRUFBMkVNLElBQTNFLENBQWdGTixLQUFoRixDQUEvQjtBQUNILGlCQTlEVTs7QUErRFg7OztBQUdBWCx1QkFsRVcsbUJBa0VIVyxLQWxFRyxFQWtFSUMsS0FsRUosRUFrRVc7QUFDbEIsMkJBQU9ILEtBQUtPLFFBQUwsQ0FBY0wsS0FBZCxLQUF3QkEsVUFBVUYsS0FBSzFCLElBQUwsQ0FBVTZCLEtBQVYsQ0FBekM7QUFDSCxpQkFwRVU7O0FBcUVYOzs7QUFHQVYsd0JBeEVXLG9CQXdFRlMsS0F4RUUsRUF3RUtDLEtBeEVMLEVBd0VZO0FBQ25CLDJCQUFPSCxLQUFLTyxRQUFMLENBQWNMLEtBQWQsS0FBd0JBLE1BQU1RLE9BQU4sQ0FBY1AsS0FBZCxLQUF3QixDQUF2RDtBQUNILGlCQTFFVTs7QUEyRVg7OztBQUdBVCx5QkE5RVcscUJBOEVEUSxLQTlFQyxFQThFTUMsS0E5RU4sRUE4RWE7QUFDcEIsMkJBQU9ILEtBQUtPLFFBQUwsQ0FBY0wsS0FBZCxLQUF3QkEsTUFBTUksTUFBTixJQUFnQkgsS0FBL0M7QUFDSCxpQkFoRlU7O0FBaUZYOzs7QUFHQVIseUJBcEZXLHFCQW9GRE8sS0FwRkMsRUFvRk1DLEtBcEZOLEVBb0ZhO0FBQ3BCLDJCQUFPSCxLQUFLTyxRQUFMLENBQWNMLEtBQWQsS0FBd0JBLE1BQU1JLE1BQU4sSUFBZ0JILEtBQS9DO0FBQ0gsaUJBdEZVOztBQXVGWDs7O0FBR0FQLDJCQTFGVyx1QkEwRkNNLEtBMUZELEVBMEZRQyxLQTFGUixFQTBGZTtBQUN0QiwyQkFBT0gsS0FBS08sUUFBTCxDQUFjTCxLQUFkLEtBQXlCQSxNQUFNSSxNQUFOLElBQWdCSCxNQUFNLENBQU4sQ0FBaEIsSUFBNEJELE1BQU1JLE1BQU4sSUFBZ0JILE1BQU0sQ0FBTixDQUE1RTtBQUNILGlCQTVGVTs7QUE2Rlg7OztBQUdBTixtQkFoR1csZUFnR1BLLEtBaEdPLEVBZ0dBQyxLQWhHQSxFQWdHTztBQUNkLDJCQUFPSCxLQUFLTyxRQUFMLENBQWNMLEtBQWQsS0FBd0JBLFNBQVNDLEtBQXhDO0FBQ0gsaUJBbEdVOztBQW1HWDs7O0FBR0FMLG1CQXRHVyxlQXNHUEksS0F0R08sRUFzR0FDLEtBdEdBLEVBc0dPO0FBQ2QsMkJBQU9ILEtBQUtPLFFBQUwsQ0FBY0wsS0FBZCxLQUF3QkEsU0FBU0MsS0FBeEM7QUFDSCxpQkF4R1U7O0FBeUdYOzs7QUFHQUoscUJBNUdXLGlCQTRHTEcsS0E1R0ssRUE0R0VDLEtBNUdGLEVBNEdTO0FBQ2hCLDJCQUFPSCxLQUFLTyxRQUFMLENBQWNMLEtBQWQsS0FBeUJBLFNBQVNDLE1BQU0sQ0FBTixDQUFULElBQXFCRCxTQUFTQyxNQUFNLENBQU4sQ0FBOUQ7QUFDSDtBQTlHVSxhQUFmO0FBZ0hIOztBQUVEOzs7Ozs7Ozs7a0NBTVVRLEksRUFBTUMsTSxFQUFRQyxPLEVBQVM7QUFDN0IsaUJBQUtaLE9BQUwsQ0FBYVUsSUFBYixJQUFxQkMsTUFBckI7QUFDQSxpQkFBSy9CLFFBQUwsQ0FBY1YsUUFBZCxDQUF1QndDLElBQXZCLElBQStCRSxZQUFZQyxTQUFaLEdBQXdCRCxPQUF4QixHQUFrQyxLQUFLaEMsUUFBTCxDQUFjVixRQUFkLENBQXVCd0MsSUFBdkIsQ0FBakU7QUFDSDs7QUFFRDs7Ozs7O3NDQUdjVCxLLEVBQU87QUFDakIsZ0JBQUlELFVBQVUsRUFBZDtBQUNBLGlCQUFLLElBQUlXLE1BQVQsSUFBbUIsS0FBS1gsT0FBeEIsRUFBaUM7QUFDN0Isb0JBQUlXLFVBQVUsT0FBTyxLQUFLWCxPQUFMLENBQWFXLE1BQWIsQ0FBUCxLQUFnQyxVQUE5QyxFQUEwRDtBQUN0RFgsNEJBQVFjLElBQVIsQ0FBYUgsTUFBYjtBQUNIO0FBQ0o7QUFDRCxtQkFBT1gsUUFBUVMsT0FBUixDQUFnQlIsS0FBaEIsTUFBMkIsQ0FBQyxDQUFuQztBQUNIOztBQUVEOzs7Ozs7a0NBR1VjLE0sRUFBUUMsTSxFQUFRO0FBQ3RCLGdCQUFNakIsT0FBTyxJQUFiO0FBQ0EsZ0JBQUlrQixVQUFVWixNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQ3hCLHVCQUFPLFlBQVc7QUFDZCx3QkFBSWEsT0FBT0MsTUFBTUMsSUFBTixDQUFXSCxTQUFYLENBQVg7QUFDQUMseUJBQUtHLE9BQUwsQ0FBYU4sTUFBYjtBQUNBLDJCQUFPaEIsS0FBS1IsU0FBTCxDQUFlK0IsS0FBZixDQUFxQixJQUFyQixFQUEyQkosSUFBM0IsQ0FBUDtBQUNILGlCQUpEO0FBS0g7QUFDRCxnQkFBSUYsV0FBV0gsU0FBZixFQUEwQjtBQUN0Qix1QkFBT0UsTUFBUDtBQUNIO0FBQ0QsZ0JBQUlFLFVBQVVaLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0JXLE9BQU9PLFdBQVAsS0FBdUJKLEtBQW5ELEVBQTBEO0FBQ3RESCx5QkFBU0csTUFBTUMsSUFBTixDQUFXSCxTQUFYLEVBQXNCTyxLQUF0QixDQUE0QixDQUE1QixDQUFUO0FBQ0g7QUFDRCxnQkFBSVIsT0FBT08sV0FBUCxLQUF1QkosS0FBM0IsRUFBa0M7QUFDOUJILHlCQUFTLENBQUNBLE1BQUQsQ0FBVDtBQUNIO0FBQ0RBLG1CQUFPUyxPQUFQLENBQWUsVUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWU7QUFDMUJaLHlCQUFTQSxPQUFPYSxPQUFQLENBQWUsSUFBSUMsTUFBSixDQUFXLFFBQVFGLENBQVIsR0FBWSxLQUF2QixFQUE4QixHQUE5QixDQUFmLEVBQW1ELFlBQVc7QUFDbkUsMkJBQU9ELENBQVA7QUFDSCxpQkFGUSxDQUFUO0FBR0gsYUFKRDtBQUtBLG1CQUFPWCxNQUFQO0FBQ0g7O0FBRUQ7Ozs7OzsrQkFHT2IsSyxFQUFPO0FBQ1YsMkJBQWVBLEtBQWYseUNBQWVBLEtBQWY7QUFDSSxxQkFBSyxTQUFMO0FBQ0lBLDRCQUFRQSxLQUFSO0FBQ0E7QUFDSixxQkFBSyxRQUFMO0FBQ0lBLDRCQUFRLENBQUMsQ0FBQ0EsTUFBTUcsTUFBaEI7QUFDQTtBQUNKLHFCQUFLLFVBQUw7QUFDSUgsNEJBQVFBLE9BQVI7QUFDSjtBQUNJQSw0QkFBUSxDQUFDLENBQVQ7QUFWUjtBQVlBLG1CQUFPQSxLQUFQO0FBQ0g7O0FBRUQ7Ozs7OztpQ0FHU0QsSyxFQUFPO0FBQ1osbUJBQU8sQ0FBQyxLQUFLRCxPQUFMLENBQWFuQixRQUFiLENBQXNCb0IsS0FBdEIsQ0FBRCxJQUFpQyxxQkFBeEM7QUFDSDs7QUFFRDs7Ozs7Ozs7c0NBS2NDLEssRUFBTzRCLEksRUFBTTtBQUN2QixnQkFBTWQsU0FBUyxLQUFLOUMsUUFBTCxDQUFjZ0MsS0FBZCxDQUFmO0FBQ0EsZ0JBQU02QixXQUFXLFFBQU9mLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBbkM7QUFDQSxnQkFBSUEsVUFBVWUsUUFBZCxFQUF3QixPQUFPZixPQUFPYyxLQUFLbkIsTUFBWixDQUFQO0FBQzNCOztBQUVEOzs7Ozs7Ozt1Q0FLZVQsSyxFQUFPNEIsSSxFQUFNO0FBQ3hCLGdCQUFJbEIsVUFBVSxLQUFLb0IsYUFBTCxDQUFtQjlCLEtBQW5CLEVBQTBCNEIsSUFBMUIsS0FBbUMsS0FBS2xELFFBQUwsQ0FBY1YsUUFBZCxDQUF1QjRELEtBQUtuQixNQUE1QixDQUFqRDtBQUNBLGdCQUFJc0IsY0FBY3JCLE9BQWQseUNBQWNBLE9BQWQsQ0FBSjs7QUFFQSxnQkFBSXFCLFNBQVMsV0FBYixFQUEwQjtBQUN0QnJCLCtEQUE2Q2tCLEtBQUtuQixNQUFsRDtBQUNILGFBRkQsTUFFTyxJQUFJc0IsU0FBUyxVQUFiLEVBQXlCO0FBQzVCckIsMEJBQVVBLFFBQVFzQixJQUFSLENBQWEsSUFBYixFQUFtQkosS0FBS0ssVUFBeEIsQ0FBVjtBQUNIOztBQUVELG1CQUFPdkIsT0FBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7d0NBTWdCVixLLEVBQU80QixJLEVBQU03QixLLEVBQU87QUFDaEMsZ0JBQUltQyxNQUFNLEtBQUtDLGNBQUwsQ0FBb0JuQyxLQUFwQixFQUEyQjRCLElBQTNCLENBQVY7O0FBRUEsaUJBQUtuRCxTQUFMLENBQWVtQyxJQUFmLENBQW9CO0FBQ2hCWix1QkFBT0EsS0FEUztBQUVoQmtDLHFCQUFLQSxHQUZXO0FBR2hCbkMsdUJBQU9BO0FBSFMsYUFBcEI7QUFLSDs7QUFFRDs7Ozs7Ozs7O21DQU1XQyxLLEVBQU9qQyxLLEVBQU9JLEksRUFBTTs7QUFFM0I7QUFDQSxpQkFBS0EsSUFBTCxHQUFZQSxJQUFaOztBQUVBO0FBQ0EsZ0JBQU00QixRQUFRNUIsS0FBSzZCLEtBQUwsTUFBZ0IsSUFBaEIsSUFBd0I3QixLQUFLNkIsS0FBTCxNQUFnQlcsU0FBeEMsR0FBb0R4QyxLQUFLNkIsS0FBTCxDQUFwRCxHQUFrRSxFQUFoRjs7QUFFQTtBQUNBLGlCQUFLLElBQUlTLE1BQVQsSUFBbUIxQyxLQUFuQixFQUEwQjs7QUFFdEI7QUFDQSxvQkFBSSxLQUFLcUUsYUFBTCxDQUFtQjNCLE1BQW5CLENBQUosRUFBZ0M7O0FBRTVCO0FBQ0Esd0JBQU1tQixPQUFPO0FBQ1RuQixnQ0FBUUEsTUFEQztBQUVUd0Isb0NBQVlsRSxNQUFNMEMsTUFBTjs7QUFHaEI7QUFMYSxxQkFBYixDQU1BLElBQU00QixTQUFTLEtBQUt2QyxPQUFMLENBQWFXLE1BQWIsRUFBcUJWLEtBQXJCLEVBQTRCNkIsS0FBS0ssVUFBakMsQ0FBZjs7QUFFQTtBQUNBLHdCQUFJSSxXQUFXLHFCQUFmLEVBQXNDO0FBQ2xDO0FBQ0g7O0FBRUQseUJBQUtDLFFBQUwsQ0FBY3RDLEtBQWQsRUFBcUJTLE1BQXJCLEVBQTZCNEIsTUFBN0IsRUFBcUN0QyxLQUFyQzs7QUFFQTtBQUNBLHdCQUFJLENBQUNzQyxNQUFMLEVBQWE7QUFDVCw2QkFBS0UsZUFBTCxDQUFxQnZDLEtBQXJCLEVBQTRCNEIsSUFBNUIsRUFBa0M3QixLQUFsQztBQUNBO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBRUQ7Ozs7Ozs7Z0NBSVFDLEssRUFBTztBQUNYLGlCQUFLeEIsSUFBTCxDQUFVd0IsS0FBVixJQUFtQjtBQUNmd0MsdUJBQU94QyxLQURRO0FBRWZ5Qyx3QkFBUSxJQUZPO0FBR2ZDLDBCQUFVLEtBSEs7QUFJZkMsd0JBQVEsRUFKTztBQUtmQywwQkFBVSxFQUxLO0FBTWZDO0FBTmUsYUFBbkI7QUFRSDs7QUFFRDs7Ozs7Ozs7OztpQ0FPUzdDLEssRUFBT1MsTSxFQUFRNEIsTSxFQUFRdEMsSyxFQUFPO0FBQ25DLGdCQUFNZSxTQUFTLEtBQUt0QyxJQUFMLENBQVV3QixLQUFWLENBQWY7QUFDQWMsbUJBQU8yQixNQUFQLEdBQWdCSixNQUFoQjtBQUNBdkIsbUJBQU80QixRQUFQLEdBQWtCLENBQUNMLE1BQW5CO0FBQ0F2QixtQkFBTzZCLE1BQVAsQ0FBY2xDLE1BQWQsSUFBd0IsQ0FBQzRCLE1BQXpCO0FBQ0F2QixtQkFBTzhCLFFBQVAsQ0FBZ0JuQyxNQUFoQixJQUEwQjRCLE1BQTFCO0FBQ0F2QixtQkFBTytCLFVBQVAsR0FBb0I5QyxLQUFwQjtBQUNIOztBQUVEOzs7Ozs7O2tDQUlVNUIsSSxFQUFNO0FBQ1osaUJBQUtJLFVBQUw7O0FBRUEsaUJBQUssSUFBSXlCLEtBQVQsSUFBa0IsS0FBS2pDLEtBQXZCLEVBQThCO0FBQzFCLHFCQUFLK0UsT0FBTCxDQUFhOUMsS0FBYjtBQUNBLHFCQUFLK0MsVUFBTCxDQUFnQi9DLEtBQWhCLEVBQXVCLEtBQUtqQyxLQUFMLENBQVdpQyxLQUFYLENBQXZCLEVBQTBDN0IsSUFBMUM7QUFDSDs7QUFFRCxtQkFBTyxLQUFLNkUsS0FBTCxFQUFQO0FBQ0g7O0FBRUQ7Ozs7OztnQ0FHUTtBQUNKLG1CQUFPLEtBQUtDLElBQUwsT0FBZ0IsQ0FBdkI7QUFDSDs7QUFFRDs7Ozs7OytCQUdPO0FBQ0gsbUJBQU8sS0FBS3hFLFNBQUwsQ0FBZTBCLE1BQXRCO0FBQ0g7O0FBRUQ7Ozs7OzsyQ0FHbUI7QUFDZixtQkFBTyxLQUFLMUIsU0FBWjtBQUNIOzs7Ozs7a0JBR1VYLFUiLCJmaWxlIjoiV3hWYWxpZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDooajljZXpqozor4FcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHJ1bGVzIOmqjOivgeWtl+auteeahOinhOWImVxyXG4gKiBAcGFyYW0ge09iamVjdH0gbWVzc2FnZXMg6aqM6K+B5a2X5q6155qE5o+Q56S65L+h5oGvXHJcbiAqXHJcbiAqL1xyXG4gY2xhc3MgV3hWYWxpZGF0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihydWxlcyA9IHt9LCBtZXNzYWdlcyA9IHt9KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XHJcbiAgICAgICAgICAgIGRhdGE6IHt9LFxyXG4gICAgICAgICAgICBydWxlcyxcclxuICAgICAgICAgICAgbWVzc2FnZXMsXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLl9faW5pdCgpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBfX2luaXRcclxuICAgICAqL1xyXG4gICAgX19pbml0KCkge1xyXG4gICAgICAgIHRoaXMuX19pbml0TWV0aG9kcygpXHJcbiAgICAgICAgdGhpcy5fX2luaXREZWZhdWx0cygpXHJcbiAgICAgICAgdGhpcy5fX2luaXREYXRhKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluaVsOaNrlxyXG4gICAgICovXHJcbiAgICBfX2luaXREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuZm9ybSA9IHt9XHJcbiAgICAgICAgdGhpcy5lcnJvckxpc3QgPSBbXVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW6buY6K6k5o+Q56S65L+h5oGvXHJcbiAgICAgKi9cclxuICAgIF9faW5pdERlZmF1bHRzKCkge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdHMgPSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogJ+i/meaYr+W/heWhq+Wtl+auteOAgicsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogJ+ivt+i+k+WFpeacieaViOeahOeUteWtkOmCruS7tuWcsOWdgOOAgicsXHJcbiAgICAgICAgICAgICAgICB0ZWw6ICfor7fovpPlhaUxMeS9jeeahOaJi+acuuWPt+eggeOAgicsXHJcbiAgICAgICAgICAgICAgICB1cmw6ICfor7fovpPlhaXmnInmlYjnmoTnvZHlnYDjgIInLFxyXG4gICAgICAgICAgICAgICAgZGF0ZTogJ+ivt+i+k+WFpeacieaViOeahOaXpeacn+OAgicsXHJcbiAgICAgICAgICAgICAgICBkYXRlSVNPOiAn6K+36L6T5YWl5pyJ5pWI55qE5pel5pyf77yISVNP77yJ77yM5L6L5aaC77yaMjAwOS0wNi0yM++8jDE5OTgvMDEvMjLjgIInLFxyXG4gICAgICAgICAgICAgICAgbnVtYmVyOiAn6K+36L6T5YWl5pyJ5pWI55qE5pWw5a2X44CCJyxcclxuICAgICAgICAgICAgICAgIGRpZ2l0czogJ+WPquiDvei+k+WFpeaVsOWtl+OAgicsXHJcbiAgICAgICAgICAgICAgICBpZGNhcmQ6ICfor7fovpPlhaUxOOS9jeeahOacieaViOi6q+S7veivgeOAgicsXHJcbiAgICAgICAgICAgICAgICBlcXVhbFRvOiB0aGlzLmZvcm1hdFRwbCgn6L6T5YWl5YC85b+F6aG75ZKMIHswfSDnm7jlkIzjgIInKSxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5zOiB0aGlzLmZvcm1hdFRwbCgn6L6T5YWl5YC85b+F6aG75YyF5ZCrIHswfeOAgicpLFxyXG4gICAgICAgICAgICAgICAgbWlubGVuZ3RoOiB0aGlzLmZvcm1hdFRwbCgn5pyA5bCR6KaB6L6T5YWlIHswfSDkuKrlrZfnrKbjgIInKSxcclxuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogdGhpcy5mb3JtYXRUcGwoJ+acgOWkmuWPr+S7pei+k+WFpSB7MH0g5Liq5a2X56ym44CCJyksXHJcbiAgICAgICAgICAgICAgICByYW5nZWxlbmd0aDogdGhpcy5mb3JtYXRUcGwoJ+ivt+i+k+WFpemVv+W6puWcqCB7MH0g5YiwIHsxfSDkuYvpl7TnmoTlrZfnrKbjgIInKSxcclxuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5mb3JtYXRUcGwoJ+ivt+i+k+WFpeS4jeWwj+S6jiB7MH0g55qE5pWw5YC844CCJyksXHJcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMuZm9ybWF0VHBsKCfor7fovpPlhaXkuI3lpKfkuo4gezB9IOeahOaVsOWAvOOAgicpLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHRoaXMuZm9ybWF0VHBsKCfor7fovpPlhaXojIPlm7TlnKggezB9IOWIsCB7MX0g5LmL6Ze055qE5pWw5YC844CCJyksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbpu5jorqTpqozor4Hmlrnms5VcclxuICAgICAqL1xyXG4gICAgX19pbml0TWV0aG9kcygpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICAgIHRoYXQubWV0aG9kcyA9IHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOmqjOivgeW/heWhq+WFg+e0oFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVxdWlyZWQodmFsdWUsIHBhcmFtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoYXQuZGVwZW5kKHBhcmFtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnZGVwZW5kZW5jeS1taXNtYXRjaCdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhMFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDpqozor4HnlLXlrZDpgq7nrrHmoLzlvI9cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGVtYWlsKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgL15bYS16QS1aMC05LiEjJCUmJyorXFwvPT9eX2B7fH1+LV0rQFthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPyg/OlxcLlthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPykqJC8udGVzdCh2YWx1ZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOmqjOivgeaJi+acuuagvOW8j1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGVsKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgL14xWzM0NTc4XVxcZHs5fSQvLnRlc3QodmFsdWUpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDpqozor4FVUkzmoLzlvI9cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHVybCh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQub3B0aW9uYWwodmFsdWUpIHx8IC9eKD86KD86KD86aHR0cHM/fGZ0cCk6KT9cXC9cXC8pKD86XFxTKyg/OjpcXFMqKT9AKT8oPzooPyEoPzoxMHwxMjcpKD86XFwuXFxkezEsM30pezN9KSg/ISg/OjE2OVxcLjI1NHwxOTJcXC4xNjgpKD86XFwuXFxkezEsM30pezJ9KSg/ITE3MlxcLig/OjFbNi05XXwyXFxkfDNbMC0xXSkoPzpcXC5cXGR7MSwzfSl7Mn0pKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswMV1cXGR8MjJbMC0zXSkoPzpcXC4oPzoxP1xcZHsxLDJ9fDJbMC00XVxcZHwyNVswLTVdKSl7Mn0oPzpcXC4oPzpbMS05XVxcZD98MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC00XSkpfCg/Oig/OlthLXpcXHUwMGExLVxcdWZmZmYwLTldLSopKlthLXpcXHUwMGExLVxcdWZmZmYwLTldKykoPzpcXC4oPzpbYS16XFx1MDBhMS1cXHVmZmZmMC05XS0qKSpbYS16XFx1MDBhMS1cXHVmZmZmMC05XSspKig/OlxcLig/OlthLXpcXHUwMGExLVxcdWZmZmZdezIsfSkpLj8pKD86OlxcZHsyLDV9KT8oPzpbLz8jXVxcUyopPyQvaS50ZXN0KHZhbHVlKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6aqM6K+B5pel5pyf5qC85byPXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBkYXRlKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgIS9JbnZhbGlkfE5hTi8udGVzdChuZXcgRGF0ZSh2YWx1ZSkudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOmqjOivgUlTT+exu+Wei+eahOaXpeacn+agvOW8j1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZGF0ZUlTTyh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQub3B0aW9uYWwodmFsdWUpIHx8IC9eXFxkezR9W1xcL1xcLV0oMD9bMS05XXwxWzAxMl0pW1xcL1xcLV0oMD9bMS05XXxbMTJdWzAtOV18M1swMV0pJC8udGVzdCh2YWx1ZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOmqjOivgeWNgei/m+WItuaVsOWtl1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbnVtYmVyKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgL14oPzotP1xcZCt8LT9cXGR7MSwzfSg/OixcXGR7M30pKyk/KD86XFwuXFxkKyk/JC8udGVzdCh2YWx1ZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOmqjOivgeaVtOaVsFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZGlnaXRzKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgL15cXGQrJC8udGVzdCh2YWx1ZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOmqjOivgei6q+S7veivgeWPt+eggVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaWRjYXJkKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgL15bMS05XVxcZHs1fVsxLTldXFxkezN9KCgwXFxkKXwoMVswLTJdKSkoKFswfDF8Ml1cXGQpfDNbMC0xXSlcXGR7M30oWzAtOV18WCkkLy50ZXN0KHZhbHVlKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6aqM6K+B5Lik5Liq6L6T5YWl5qGG55qE5YaF5a655piv5ZCm55u45ZCMXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBlcXVhbFRvKHZhbHVlLCBwYXJhbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQub3B0aW9uYWwodmFsdWUpIHx8IHZhbHVlID09PSB0aGF0LmRhdGFbcGFyYW1dXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDpqozor4HmmK/lkKbljIXlkKvmn5DkuKrlgLxcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNvbnRhaW5zKHZhbHVlLCBwYXJhbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQub3B0aW9uYWwodmFsdWUpIHx8IHZhbHVlLmluZGV4T2YocGFyYW0pID49IDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOmqjOivgeacgOWwj+mVv+W6plxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbWlubGVuZ3RoKHZhbHVlLCBwYXJhbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQub3B0aW9uYWwodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA+PSBwYXJhbVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6aqM6K+B5pyA5aSn6ZW/5bqmXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBtYXhsZW5ndGgodmFsdWUsIHBhcmFtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoIDw9IHBhcmFtXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDpqozor4HkuIDkuKrplb/luqbojIPlm7RbbWluLCBtYXhdXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICByYW5nZWxlbmd0aCh2YWx1ZSwgcGFyYW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0Lm9wdGlvbmFsKHZhbHVlKSB8fCAodmFsdWUubGVuZ3RoID49IHBhcmFtWzBdICYmIHZhbHVlLmxlbmd0aCA8PSBwYXJhbVsxXSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOmqjOivgeacgOWwj+WAvFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbWluKHZhbHVlLCBwYXJhbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQub3B0aW9uYWwodmFsdWUpIHx8IHZhbHVlID49IHBhcmFtXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDpqozor4HmnIDlpKflgLxcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIG1heCh2YWx1ZSwgcGFyYW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0Lm9wdGlvbmFsKHZhbHVlKSB8fCB2YWx1ZSA8PSBwYXJhbVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6aqM6K+B5LiA5Liq5YC86IyD5Zu0W21pbiwgbWF4XVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmFuZ2UodmFsdWUsIHBhcmFtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgKHZhbHVlID49IHBhcmFtWzBdICYmIHZhbHVlIDw9IHBhcmFtWzFdKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOiHquWumuS5iemqjOivgeaWueazlVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUg5pa55rOV5ZCNXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2Qg5Ye95pWw5L2T77yM5o6l5pS25Lik5Liq5Y+C5pWwKHZhbHVlLCBwYXJhbSnvvIx2YWx1ZeihqOekuuWFg+e0oOeahOWAvO+8jHBhcmFt6KGo56S65Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSDmj5DnpLrkv6Hmga9cclxuICAgICAqL1xyXG4gICAgYWRkTWV0aG9kKG5hbWUsIG1ldGhvZCwgbWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubWV0aG9kc1tuYW1lXSA9IG1ldGhvZFxyXG4gICAgICAgIHRoaXMuZGVmYXVsdHMubWVzc2FnZXNbbmFtZV0gPSBtZXNzYWdlICE9PSB1bmRlZmluZWQgPyBtZXNzYWdlIDogdGhpcy5kZWZhdWx0cy5tZXNzYWdlc1tuYW1lXVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat6aqM6K+B5pa55rOV5piv5ZCm5a2Y5ZyoXHJcbiAgICAgKi9cclxuICAgIGlzVmFsaWRNZXRob2QodmFsdWUpIHtcclxuICAgICAgICBsZXQgbWV0aG9kcyA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgbWV0aG9kIGluIHRoaXMubWV0aG9kcykge1xyXG4gICAgICAgICAgICBpZiAobWV0aG9kICYmIHR5cGVvZiB0aGlzLm1ldGhvZHNbbWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kcy5wdXNoKG1ldGhvZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWV0aG9kcy5pbmRleE9mKHZhbHVlKSAhPT0gLTFcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagvOW8j+WMluaPkOekuuS/oeaBr+aooeadv1xyXG4gICAgICovXHJcbiAgICBmb3JtYXRUcGwoc291cmNlLCBwYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpXHJcbiAgICAgICAgICAgICAgICBhcmdzLnVuc2hpZnQoc291cmNlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZm9ybWF0VHBsLmFwcGx5KHRoaXMsIGFyZ3MpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhcmFtcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIHBhcmFtcy5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHtcclxuICAgICAgICAgICAgcGFyYW1zID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLnNsaWNlKDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbXMuY29uc3RydWN0b3IgIT09IEFycmF5KSB7XHJcbiAgICAgICAgICAgIHBhcmFtcyA9IFtwYXJhbXNdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmFtcy5mb3JFYWNoKGZ1bmN0aW9uKG4sIGkpIHtcclxuICAgICAgICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFx7XCIgKyBpICsgXCJcXFxcfVwiLCBcImdcIiksIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBzb3VyY2VcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreinhOWImeS+nei1luaYr+WQpuWtmOWcqFxyXG4gICAgICovXHJcbiAgICBkZXBlbmQocGFyYW0pIHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBwYXJhbSkge1xyXG4gICAgICAgICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgICAgICAgICAgIHBhcmFtID0gcGFyYW1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICBwYXJhbSA9ICEhcGFyYW0ubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XHJcbiAgICAgICAgICAgICAgICBwYXJhbSA9IHBhcmFtKClcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHBhcmFtID0gITBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3ovpPlhaXlgLzmmK/lkKbkuLrnqbpcclxuICAgICAqL1xyXG4gICAgb3B0aW9uYWwodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMubWV0aG9kcy5yZXF1aXJlZCh2YWx1ZSkgJiYgJ2RlcGVuZGVuY3ktbWlzbWF0Y2gnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5boh6rlrprkuYnlrZfmrrXnmoTmj5DnpLrkv6Hmga9cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbSDlrZfmrrXlkI1cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBydWxlIOinhOWImVxyXG4gICAgICovXHJcbiAgICBjdXN0b21NZXNzYWdlKHBhcmFtLCBydWxlKSB7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5tZXNzYWdlc1twYXJhbV1cclxuICAgICAgICBjb25zdCBpc09iamVjdCA9IHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnXHJcbiAgICAgICAgaWYgKHBhcmFtcyAmJiBpc09iamVjdCkgcmV0dXJuIHBhcmFtc1tydWxlLm1ldGhvZF1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluafkOS4quaMh+WumuWtl+auteeahOaPkOekuuS/oeaBr1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtIOWtl+auteWQjVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJ1bGUg6KeE5YiZXHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRNZXNzYWdlKHBhcmFtLCBydWxlKSB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLmN1c3RvbU1lc3NhZ2UocGFyYW0sIHJ1bGUpIHx8IHRoaXMuZGVmYXVsdHMubWVzc2FnZXNbcnVsZS5tZXRob2RdXHJcbiAgICAgICAgbGV0IHR5cGUgPSB0eXBlb2YgbWVzc2FnZVxyXG5cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgbWVzc2FnZSA9IGBXYXJuaW5nOiBObyBtZXNzYWdlIGRlZmluZWQgZm9yICR7cnVsZS5tZXRob2R9LmBcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UuY2FsbCh0aGlzLCBydWxlLnBhcmFtZXRlcnMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57yT5a2Y6ZSZ6K+v5L+h5oGvXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyYW0g5a2X5q615ZCNXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcnVsZSDop4TliJlcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSDlhYPntKDnmoTlgLxcclxuICAgICAqL1xyXG4gICAgZm9ybWF0VHBsQW5kQWRkKHBhcmFtLCBydWxlLCB2YWx1ZSkge1xyXG4gICAgICAgIGxldCBtc2cgPSB0aGlzLmRlZmF1bHRNZXNzYWdlKHBhcmFtLCBydWxlKVxyXG5cclxuICAgICAgICB0aGlzLmVycm9yTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgcGFyYW06IHBhcmFtLFxyXG4gICAgICAgICAgICBtc2c6IG1zZyxcclxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpqozor4Hmn5DkuKrmjIflrprlrZfmrrXnmoTop4TliJlcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbSDlrZfmrrXlkI1cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBydWxlcyDop4TliJlcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIOmcgOimgemqjOivgeeahOaVsOaNruWvueixoVxyXG4gICAgICovXHJcbiAgICBjaGVja1BhcmFtKHBhcmFtLCBydWxlcywgZGF0YSkge1xyXG5cclxuICAgICAgICAvLyDnvJPlrZjmlbDmja7lr7nosaFcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhXHJcblxyXG4gICAgICAgIC8vIOe8k+WtmOWtl+auteWvueW6lOeahOWAvFxyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZGF0YVtwYXJhbV0gIT09IG51bGwgJiYgZGF0YVtwYXJhbV0gIT09IHVuZGVmaW5lZCA/IGRhdGFbcGFyYW1dIDogJydcclxuXHJcbiAgICAgICAgLy8g6YGN5Y6G5p+Q5Liq5oyH5a6a5a2X5q6155qE5omA5pyJ6KeE5YiZ77yM5L6d5qyh6aqM6K+B6KeE5YiZ77yM5ZCm5YiZ57yT5a2Y6ZSZ6K+v5L+h5oGvXHJcbiAgICAgICAgZm9yIChsZXQgbWV0aG9kIGluIHJ1bGVzKSB7XHJcblxyXG4gICAgICAgICAgICAvLyDliKTmlq3pqozor4Hmlrnms5XmmK/lkKblrZjlnKhcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZE1ldGhvZChtZXRob2QpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g57yT5a2Y6KeE5YiZ55qE5bGe5oCn5Y+K5YC8XHJcbiAgICAgICAgICAgICAgICBjb25zdCBydWxlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHJ1bGVzW21ldGhvZF1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDosIPnlKjpqozor4Hmlrnms5VcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMubWV0aG9kc1ttZXRob2RdKHZhbHVlLCBydWxlLnBhcmFtZXRlcnMpXHJcblxyXG4gICAgICAgICAgICAgICAgLy8g6IulcmVzdWx06L+U5Zue5YC85Li6ZGVwZW5kZW5jeS1taXNtYXRjaO+8jOWImeivtOaYjuivpeWtl+auteeahOWAvOS4uuepuuaIlumdnuW/heWhq+Wtl+autVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gJ2RlcGVuZGVuY3ktbWlzbWF0Y2gnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlKHBhcmFtLCBtZXRob2QsIHJlc3VsdCwgdmFsdWUpXHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat5piv5ZCm6YCa6L+H6aqM6K+B77yM5ZCm5YiZ57yT5a2Y6ZSZ6K+v5L+h5oGv77yM6Lez5Ye65b6q546vXHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0VHBsQW5kQWRkKHBhcmFtLCBydWxlLCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5a2X5q6155qE6buY6K6k6aqM6K+B5YC8XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyYW0g5a2X5q615ZCNXHJcbiAgICAgKi9cclxuICAgIHNldFZpZXcocGFyYW0pIHtcclxuICAgICAgICB0aGlzLmZvcm1bcGFyYW1dID0ge1xyXG4gICAgICAgICAgICAkbmFtZTogcGFyYW0sXHJcbiAgICAgICAgICAgICR2YWxpZDogdHJ1ZSxcclxuICAgICAgICAgICAgJGludmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAkZXJyb3I6IHt9LFxyXG4gICAgICAgICAgICAkc3VjY2Vzczoge30sXHJcbiAgICAgICAgICAgICR2aWV3VmFsdWU6IGBgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWtl+auteeahOmqjOivgeWAvFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtIOWtl+auteWQjVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCDlrZfmrrXnmoTmlrnms5VcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVzdWx0IOaYr+WQpumAmui/h+mqjOivgVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIOWtl+auteeahOWAvFxyXG4gICAgICovXHJcbiAgICBzZXRWYWx1ZShwYXJhbSwgbWV0aG9kLCByZXN1bHQsIHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5mb3JtW3BhcmFtXVxyXG4gICAgICAgIHBhcmFtcy4kdmFsaWQgPSByZXN1bHRcclxuICAgICAgICBwYXJhbXMuJGludmFsaWQgPSAhcmVzdWx0XHJcbiAgICAgICAgcGFyYW1zLiRlcnJvclttZXRob2RdID0gIXJlc3VsdFxyXG4gICAgICAgIHBhcmFtcy4kc3VjY2Vzc1ttZXRob2RdID0gcmVzdWx0XHJcbiAgICAgICAgcGFyYW1zLiR2aWV3VmFsdWUgPSB2YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aqM6K+B5omA5pyJ5a2X5q6155qE6KeE5YiZ77yM6L+U5Zue6aqM6K+B5piv5ZCm6YCa6L+HXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSDpnIDopoHpqozor4HmlbDmja7lr7nosaFcclxuICAgICAqL1xyXG4gICAgY2hlY2tGb3JtKGRhdGEpIHtcclxuICAgICAgICB0aGlzLl9faW5pdERhdGEoKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBwYXJhbSBpbiB0aGlzLnJ1bGVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmlldyhwYXJhbSlcclxuICAgICAgICAgICAgdGhpcy5jaGVja1BhcmFtKHBhcmFtLCB0aGlzLnJ1bGVzW3BhcmFtXSwgZGF0YSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnumqjOivgeaYr+WQpumAmui/h1xyXG4gICAgICovXHJcbiAgICB2YWxpZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaXplKCkgPT09IDBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnumUmeivr+S/oeaBr+eahOS4quaVsFxyXG4gICAgICovXHJcbiAgICBzaXplKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yTGlzdC5sZW5ndGhcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuaJgOaciemUmeivr+S/oeaBr1xyXG4gICAgICovXHJcbiAgICB2YWxpZGF0aW9uRXJyb3JzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yTGlzdFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXeFZhbGlkYXRlIl19