'use strict';

/* WPT Refs:
   https://github.com/w3c/web-platform-tests/blob/3eff1bd/url/setters_tests.json
   License: http://www.w3.org/Consortium/Legal/2008/04-testsuite-copyright.html
*/
module.exports =
{
    "comment": [
        "## Tests for setters of https://url.spec.whatwg.org/#urlutils-members",
        "",
        "This file contains a JSON object.",
        "Other than 'comment', each key is an attribute of the `URL` interface",
        "defined in WHATWG’s URL Standard.",
        "The values are arrays of test case objects for that attribute.",
        "",
        "To run a test case for the attribute `attr`:",
        "",
        "* Create a new `URL` object with the value for the 'href' key",
        "  the constructor single parameter. (Without a base URL.)",
        "  This must not throw.",
        "* Set the attribute `attr` to (invoke its setter with)",
        "  with the value of for 'new_value' key.",
        "* The value for the 'expected' key is another object.",
        "  For each `key` / `value` pair of that object,",
        "  get the attribute `key` (invoke its getter).",
        "  The returned string must be equal to `value`.",
        "",
        "Note: the 'href' setter is already covered by urltestdata.json."
    ],
    "protocol": [
        {
            "comment": "The empty string is not a valid scheme. Setter leaves the URL unchanged.",
            "href": "a://example.net",
            "new_value": "",
            "expected": {
                "href": "a://example.net",
                "protocol": "a:"
            }
        },
        {
            "href": "a://example.net",
            "new_value": "b",
            "expected": {
                "href": "b://example.net",
                "protocol": "b:"
            }
        },
        {
            "href": "javascript:alert(1)",
            "new_value": "defuse",
            "expected": {
                "href": "defuse:alert(1)",
                "protocol": "defuse:"
            }
        },
        {
            "comment": "Upper-case ASCII is lower-cased",
            "href": "a://example.net",
            "new_value": "B",
            "expected": {
                "href": "b://example.net",
                "protocol": "b:"
            }
        },
        {
            "comment": "Non-ASCII is rejected",
            "href": "a://example.net",
            "new_value": "é",
            "expected": {
                "href": "a://example.net",
                "protocol": "a:"
            }
        },
        {
            "comment": "No leading digit",
            "href": "a://example.net",
            "new_value": "0b",
            "expected": {
                "href": "a://example.net",
                "protocol": "a:"
            }
        },
        {
            "comment": "No leading punctuation",
            "href": "a://example.net",
            "new_value": "+b",
            "expected": {
                "href": "a://example.net",
                "protocol": "a:"
            }
        },
        {
            "href": "a://example.net",
            "new_value": "bC0+-.",
            "expected": {
                "href": "bc0+-.://example.net",
                "protocol": "bc0+-.:"
            }
        },
        {
            "comment": "Only some punctuation is acceptable",
            "href": "a://example.net",
            "new_value": "b,c",
            "expected": {
                "href": "a://example.net",
                "protocol": "a:"
            }
        },
        {
            "comment": "Non-ASCII is rejected",
            "href": "a://example.net",
            "new_value": "bé",
            "expected": {
                "href": "a://example.net",
                "protocol": "a:"
            }
        },
        {
            "comment": "Can’t switch from URL containing username/password/port to file",
            "href": "http://test@example.net",
            "new_value": "file",
            "expected": {
                "href": "http://test@example.net/",
                "protocol": "http:"
            }
        },
        {
            "href": "gopher://example.net:1234",
            "new_value": "file",
            "expected": {
                "href": "gopher://example.net:1234/",
                "protocol": "gopher:"
            }
        },
        {
            "href": "wss://x:x@example.net:1234",
            "new_value": "file",
            "expected": {
                "href": "wss://x:x@example.net:1234/",
                "protocol": "wss:"
            }
        },
        {
            "comment": "Can’t switch from file URL with no host",
            "href": "file://localhost/",
            "new_value": "http",
            "expected": {
                "href": "file:///",
                "protocol": "file:"
            }
        },
        {
            "href": "file:///test",
            "new_value": "gopher",
            "expected": {
                "href": "file:///test",
                "protocol": "file:"
            }
        },
        {
            "href": "file:",
            "new_value": "wss",
            "expected": {
                "href": "file:///",
                "protocol": "file:"
            }
        },
        {
            "comment": "Can’t switch from special scheme to non-special",
            "href": "http://example.net",
            "new_value": "b",
            "expected": {
                "href": "http://example.net/",
                "protocol": "http:"
            }
        },
        {
            "href": "file://hi/path",
            "new_value": "s",
            "expected": {
                "href": "file://hi/path",
                "protocol": "file:"
            }
        },
        {
            "href": "https://example.net",
            "new_value": "s",
            "expected": {
                "href": "https://example.net/",
                "protocol": "https:"
            }
        },
        {
            "href": "ftp://example.net",
            "new_value": "test",
            "expected": {
                "href": "ftp://example.net/",
                "protocol": "ftp:"
            }
        },
        {
            "comment": "Cannot-be-a-base URL doesn’t have a host, but URL in a special scheme must.",
            "href": "mailto:me@example.net",
            "new_value": "http",
            "expected": {
                "href": "mailto:me@example.net",
                "protocol": "mailto:"
            }
        },
        {
            "comment": "Can’t switch from non-special scheme to special",
            "href": "ssh://me@example.net",
            "new_value": "http",
            "expected": {
                "href": "ssh://me@example.net",
                "protocol": "ssh:"
            }
        },
        {
            "href": "ssh://me@example.net",
            "new_value": "gopher",
            "expected": {
                "href": "ssh://me@example.net",
                "protocol": "ssh:"
            }
        },
        {
            "href": "ssh://me@example.net",
            "new_value": "file",
            "expected": {
                "href": "ssh://me@example.net",
                "protocol": "ssh:"
            }
        },
        {
            "href": "ssh://example.net",
            "new_value": "file",
            "expected": {
                "href": "ssh://example.net",
                "protocol": "ssh:"
            }
        },
        {
            "href": "nonsense:///test",
            "new_value": "https",
            "expected": {
                "href": "nonsense:///test",
                "protocol": "nonsense:"
            }
        },
        {
            "comment": "Stuff after the first ':' is ignored",
            "href": "http://example.net",
            "new_value": "https:foo : bar",
            "expected": {
                "href": "https://example.net/",
                "protocol": "https:"
            }
        },
        {
            "comment": "Stuff after the first ':' is ignored",
            "href": "data:text/html,<p>Test",
            "new_value": "view-source+data:foo : bar",
            "expected": {
                "href": "view-source+data:text/html,<p>Test",
                "protocol": "view-source+data:"
            }
        }
    ],
    "username": [
        {
            "comment": "No host means no username",
            "href": "file:///home/you/index.html",
            "new_value": "me",
            "expected": {
                "href": "file:///home/you/index.html",
                "username": ""
            }
        },
        {
            "comment": "No host means no username",
            "href": "unix:/run/foo.socket",
            "new_value": "me",
            "expected": {
                "href": "unix:/run/foo.socket",
                "username": ""
            }
        },
        {
            "comment": "Cannot-be-a-base means no username",
            "href": "mailto:you@example.net",
            "new_value": "me",
            "expected": {
                "href": "mailto:you@example.net",
                "username": ""
            }
        },
        {
            "href": "javascript:alert(1)",
            "new_value": "wario",
            "expected": {
                "href": "javascript:alert(1)",
                "username": ""
            }
        },
        {
            "href": "http://example.net",
            "new_value": "me",
            "expected": {
                "href": "http://me@example.net/",
                "username": "me"
            }
        },
        {
            "href": "http://:secret@example.net",
            "new_value": "me",
            "expected": {
                "href": "http://me:secret@example.net/",
                "username": "me"
            }
        },
        {
            "href": "http://me@example.net",
            "new_value": "",
            "expected": {
                "href": "http://example.net/",
                "username": ""
            }
        },
        {
            "href": "http://me:secret@example.net",
            "new_value": "",
            "expected": {
                "href": "http://:secret@example.net/",
                "username": ""
            }
        },
        {
            "comment": "UTF-8 percent encoding with the userinfo encode set.",
            "href": "http://example.net",
            "new_value": "\u0000\u0001\t\n\r\u001f !\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~\u007f\u0080\u0081Éé",
            "expected": {
                "href": "http://%00%01%09%0A%0D%1F%20!%22%23$%&'()*+,-.%2F09%3A%3B%3C%3D%3E%3F%40AZ%5B%5C%5D%5E_%60az%7B%7C%7D~%7F%C2%80%C2%81%C3%89%C3%A9@example.net/",
                "username": "%00%01%09%0A%0D%1F%20!%22%23$%&'()*+,-.%2F09%3A%3B%3C%3D%3E%3F%40AZ%5B%5C%5D%5E_%60az%7B%7C%7D~%7F%C2%80%C2%81%C3%89%C3%A9"
            }
        },
        {
            "comment": "Bytes already percent-encoded are left as-is.",
            "href": "http://example.net",
            "new_value": "%c3%89té",
            "expected": {
                "href": "http://%c3%89t%C3%A9@example.net/",
                "username": "%c3%89t%C3%A9"
            }
        },
        {
            "href": "sc:///",
            "new_value": "x",
            "expected": {
                "href": "sc:///",
                "username": ""
            }
        },
        {
            "href": "javascript://x/",
            "new_value": "wario",
            "expected": {
                "href": "javascript://wario@x/",
                "username": "wario"
            }
        },
        // {
        //     "href": "file://test/",
        //     "new_value": "test",
        //     "expected": {
        //         "href": "file://test/",
        //         "username": ""
        //     }
        // }
    ],
    "password": [
        {
            "comment": "No host means no password",
            "href": "file:///home/me/index.html",
            "new_value": "secret",
            "expected": {
                "href": "file:///home/me/index.html",
                "password": ""
            }
        },
        {
            "comment": "No host means no password",
            "href": "unix:/run/foo.socket",
            "new_value": "secret",
            "expected": {
                "href": "unix:/run/foo.socket",
                "password": ""
            }
        },
        {
            "comment": "Cannot-be-a-base means no password",
            "href": "mailto:me@example.net",
            "new_value": "secret",
            "expected": {
                "href": "mailto:me@example.net",
                "password": ""
            }
        },
        {
            "href": "http://example.net",
            "new_value": "secret",
            "expected": {
                "href": "http://:secret@example.net/",
                "password": "secret"
            }
        },
        {
            "href": "http://me@example.net",
            "new_value": "secret",
            "expected": {
                "href": "http://me:secret@example.net/",
                "password": "secret"
            }
        },
        {
            "href": "http://:secret@example.net",
            "new_value": "",
            "expected": {
                "href": "http://example.net/",
                "password": ""
            }
        },
        {
            "href": "http://me:secret@example.net",
            "new_value": "",
            "expected": {
                "href": "http://me@example.net/",
                "password": ""
            }
        },
        {
            "comment": "UTF-8 percent encoding with the userinfo encode set.",
            "href": "http://example.net",
            "new_value": "\u0000\u0001\t\n\r\u001f !\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~\u007f\u0080\u0081Éé",
            "expected": {
                "href": "http://:%00%01%09%0A%0D%1F%20!%22%23$%&'()*+,-.%2F09%3A%3B%3C%3D%3E%3F%40AZ%5B%5C%5D%5E_%60az%7B%7C%7D~%7F%C2%80%C2%81%C3%89%C3%A9@example.net/",
                "password": "%00%01%09%0A%0D%1F%20!%22%23$%&'()*+,-.%2F09%3A%3B%3C%3D%3E%3F%40AZ%5B%5C%5D%5E_%60az%7B%7C%7D~%7F%C2%80%C2%81%C3%89%C3%A9"
            }
        },
        {
            "comment": "Bytes already percent-encoded are left as-is.",
            "href": "http://example.net",
            "new_value": "%c3%89té",
            "expected": {
                "href": "http://:%c3%89t%C3%A9@example.net/",
                "password": "%c3%89t%C3%A9"
            }
        },
        {
            "href": "sc:///",
            "new_value": "x",
            "expected": {
                "href": "sc:///",
                "password": ""
            }
        },
        {
            "href": "javascript://x/",
            "new_value": "bowser",
            "expected": {
                "href": "javascript://:bowser@x/",
                "password": "bowser"
            }
        },
        // {
        //     "href": "file://test/",
        //     "new_value": "test",
        //     "expected": {
        //         "href": "file://test/",
        //         "password": ""
        //     }
        // }
    ],
    "host": [
        {
            "comment": "Non-special scheme",
            "href": "sc://x/",
            "new_value": "\u0000",
            "expected": {
                "href": "sc://x/",
                "host": "x",
                "hostname": "x"
            }
        },
        // {
        //     "href": "sc://x/",
        //     "new_value": "\u0009",
        //     "expected": {
        //         "href": "sc:///",
        //         "host": "",
        //         "hostname": ""
        //     }
        // },
        // {
        //     "href": "sc://x/",
        //     "new_value": "\u000A",
        //     "expected": {
        //         "href": "sc:///",
        //         "host": "",
        //         "hostname": ""
        //     }
        // },
        // {
        //     "href": "sc://x/",
        //     "new_value": "\u000D",
        //     "expected": {
        //         "href": "sc:///",
        //         "host": "",
        //         "hostname": ""
        //     }
        // },
        {
            "href": "sc://x/",
            "new_value": " ",
            "expected": {
                "href": "sc://x/",
                "host": "x",
                "hostname": "x"
            }
        },
        // {
        //     "href": "sc://x/",
        //     "new_value": "#",
        //     "expected": {
        //         "href": "sc:///",
        //         "host": "",
        //         "hostname": ""
        //     }
        // },
        // {
        //     "href": "sc://x/",
        //     "new_value": "/",
        //     "expected": {
        //         "href": "sc:///",
        //         "host": "",
        //         "hostname": ""
        //     }
        // },
        // {
        //     "href": "sc://x/",
        //     "new_value": "?",
        //     "expected": {
        //         "href": "sc:///",
        //         "host": "",
        //         "hostname": ""
        //     }
        // },
        {
            "href": "sc://x/",
            "new_value": "@",
            "expected": {
                "href": "sc://x/",
                "host": "x",
                "hostname": "x"
            }
        },
        // {
        //     "href": "sc://x/",
        //     "new_value": "ß",
        //     "expected": {
        //         "href": "sc://%C3%9F/",
        //         "host": "%C3%9F",
        //         "hostname": "%C3%9F"
        //     }
        // },
        {
            "comment": "IDNA Nontransitional_Processing",
            "href": "https://x/",
            "new_value": "ß",
            "expected": {
                "href": "https://xn--zca/",
                "host": "xn--zca",
                "hostname": "xn--zca"
            }
        },
        {
            "comment": "Cannot-be-a-base means no host",
            "href": "mailto:me@example.net",
            "new_value": "example.com",
            "expected": {
                "href": "mailto:me@example.net",
                "host": ""
            }
        },
        {
            "comment": "Cannot-be-a-base means no password",
            "href": "data:text/plain,Stuff",
            "new_value": "example.net",
            "expected": {
                "href": "data:text/plain,Stuff",
                "host": ""
            }
        },
        {
            "href": "http://example.net",
            "new_value": "example.com:8080",
            "expected": {
                "href": "http://example.com:8080/",
                "host": "example.com:8080",
                "hostname": "example.com",
                "port": "8080"
            }
        },
        {
            "comment": "Port number is unchanged if not specified in the new value",
            "href": "http://example.net:8080",
            "new_value": "example.com",
            "expected": {
                "href": "http://example.com:8080/",
                "host": "example.com:8080",
                "hostname": "example.com",
                "port": "8080"
            }
        },
        {
            "comment": "Port number is unchanged if not specified",
            "href": "http://example.net:8080",
            "new_value": "example.com:",
            "expected": {
                "href": "http://example.com:8080/",
                "host": "example.com:8080",
                "hostname": "example.com",
                "port": "8080"
            }
        },
        {
            "comment": "The empty host is not valid for special schemes",
            "href": "http://example.net",
            "new_value": "",
            "expected": {
                "href": "http://example.net/",
                "host": "example.net"
            }
        },
        {
            "comment": "The empty host is OK for non-special schemes",
            "href": "view-source+http://example.net/foo",
            "new_value": "",
            "expected": {
                "href": "view-source+http:///foo",
                "host": ""
            }
        },
        {
            "comment": "Path-only URLs can gain a host",
            "href": "a:/foo",
            "new_value": "example.net",
            "expected": {
                "href": "a://example.net/foo",
                "host": "example.net"
            }
        },
        {
            "comment": "IPv4 address syntax is normalized",
            "href": "http://example.net",
            "new_value": "0x7F000001:8080",
            "expected": {
                "href": "http://127.0.0.1:8080/",
                "host": "127.0.0.1:8080",
                "hostname": "127.0.0.1",
                "port": "8080"
            }
        },
        {
            "comment": "IPv6 address syntax is normalized",
            "href": "http://example.net",
            "new_value": "[::0:01]:2",
            "expected": {
                "href": "http://[::1]:2/",
                "host": "[::1]:2",
                "hostname": "[::1]",
                "port": "2"
            }
        },
        {
            "comment": "Default port number is removed",
            "href": "http://example.net",
            "new_value": "example.com:80",
            "expected": {
                "href": "http://example.com/",
                "host": "example.com",
                "hostname": "example.com",
                "port": ""
            }
        },
        {
            "comment": "Default port number is removed",
            "href": "https://example.net",
            "new_value": "example.com:443",
            "expected": {
                "href": "https://example.com/",
                "host": "example.com",
                "hostname": "example.com",
                "port": ""
            }
        },
        {
            "comment": "Default port number is only removed for the relevant scheme",
            "href": "https://example.net",
            "new_value": "example.com:80",
            "expected": {
                "href": "https://example.com:80/",
                "host": "example.com:80",
                "hostname": "example.com",
                "port": "80"
            }
        },
        {
            "comment": "Stuff after a / delimiter is ignored",
            "href": "http://example.net/path",
            "new_value": "example.com/stuff",
            "expected": {
                "href": "http://example.com/path",
                "host": "example.com",
                "hostname": "example.com",
                "port": ""
            }
        },
        {
            "comment": "Stuff after a / delimiter is ignored",
            "href": "http://example.net/path",
            "new_value": "example.com:8080/stuff",
            "expected": {
                "href": "http://example.com:8080/path",
                "host": "example.com:8080",
                "hostname": "example.com",
                "port": "8080"
            }
        },
        {
            "comment": "Stuff after a ? delimiter is ignored",
            "href": "http://example.net/path",
            "new_value": "example.com?stuff",
            "expected": {
                "href": "http://example.com/path",
                "host": "example.com",
                "hostname": "example.com",
                "port": ""
            }
        },
        {
            "comment": "Stuff after a ? delimiter is ignored",
            "href": "http://example.net/path",
            "new_value": "example.com:8080?stuff",
            "expected": {
                "href": "http://example.com:8080/path",
                "host": "example.com:8080",
                "hostname": "example.com",
                "port": "8080"
            }
        },
        {
            "comment": "Stuff after a # delimiter is ignored",
            "href": "http://example.net/path",
            "new_value": "example.com#stuff",
            "expected": {
                "href": "http://example.com/path",
                "host": "example.com",
                "hostname": "example.com",
                "port": ""
            }
        },
        {
            "comment": "Stuff after a # delimiter is ignored",
            "href": "http://example.net/path",
            "new_value": "example.com:8080#stuff",
            "expected": {
                "href": "http://example.com:8080/path",
                "host": "example.com:8080",
                "hostname": "example.com",
                "port": "8080"
            }
        },
        {
            "comment": "Stuff after a \\ delimiter is ignored for special schemes",
            "href": "http://example.net/path",
            "new_value": "example.com\\stuff",
            "expected": {
                "href": "http://example.com/path",
                "host": "example.com",
                "hostname": "example.com",
                "port": ""
            }
        },
        {
            "comment": "Stuff after a \\ delimiter is ignored for special schemes",
            "href": "http://example.net/path",
            "new_value": "example.com:8080\\stuff",
            "expected": {
                "href": "http://example.com:8080/path",
                "host": "example.com:8080",
                "hostname": "example.com",
                "port": "8080"
            }
        },
        {
            "comment": "\\ is not a delimiter for non-special schemes, but still forbidden in hosts",
            "href": "view-source+http://example.net/path",
            "new_value": "example.com\\stuff",
            "expected": {
                "href": "view-source+http://example.net/path",
                "host": "example.net",
                "hostname": "example.net",
                "port": ""
            }
        },
        {
            "comment": "Anything other than ASCII digit stops the port parser in a setter but is not an error",
            "href": "view-source+http://example.net/path",
            "new_value": "example.com:8080stuff2",
            "expected": {
                "href": "view-source+http://example.com:8080/path",
                "host": "example.com:8080",
                "hostname": "example.com",
                "port": "8080"
            }
        },
        {
            "comment": "Anything other than ASCII digit stops the port parser in a setter but is not an error",
            "href": "http://example.net/path",
            "new_value": "example.com:8080stuff2",
            "expected": {
                "href": "http://example.com:8080/path",
                "host": "example.com:8080",
                "hostname": "example.com",
                "port": "8080"
            }
        },
        {
            "comment": "Anything other than ASCII digit stops the port parser in a setter but is not an error",
            "href": "http://example.net/path",
            "new_value": "example.com:8080+2",
            "expected": {
                "href": "http://example.com:8080/path",
                "host": "example.com:8080",
                "hostname": "example.com",
                "port": "8080"
            }
        },
        {
            "comment": "Port numbers are 16 bit integers",
            "href": "http://example.net/path",
            "new_value": "example.com:65535",
            "expected": {
                "href": "http://example.com:65535/path",
                "host": "example.com:65535",
                "hostname": "example.com",
                "port": "65535"
            }
        },
        {
            "comment": "Port numbers are 16 bit integers, overflowing is an error. Hostname is still set, though.",
            "href": "http://example.net/path",
            "new_value": "example.com:65536",
            "expected": {
                "href": "http://example.com/path",
                "host": "example.com",
                "hostname": "example.com",
                "port": ""
            }
        },
        {
            "comment": "Broken IPv6",
            "href": "http://example.net/",
            "new_value": "[google.com]",
            "expected": {
                "href": "http://example.net/",
                "host": "example.net",
                "hostname": "example.net"
            }
        },
        // {
        //     "href": "http://example.net/",
        //     "new_value": "[::1.2.3.4x]",
        //     "expected": {
        //         "href": "http://example.net/",
        //         "host": "example.net",
        //         "hostname": "example.net"
        //     }
        // },
        // {
        //     "href": "http://example.net/",
        //     "new_value": "[::1.2.3.]",
        //     "expected": {
        //         "href": "http://example.net/",
        //         "host": "example.net",
        //         "hostname": "example.net"
        //     }
        // },
        // {
        //     "href": "http://example.net/",
        //     "new_value": "[::1.2.]",
        //     "expected": {
        //         "href": "http://example.net/",
        //         "host": "example.net",
        //         "hostname": "example.net"
        //     }
        // },
        // {
        //     "href": "http://example.net/",
        //     "new_value": "[::1.]",
        //     "expected": {
        //         "href": "http://example.net/",
        //         "host": "example.net",
        //         "hostname": "example.net"
        //     }
        // },
        // {
        //     "href": "file://y/",
        //     "new_value": "x:123",
        //     "expected": {
        //         "href": "file://y/",
        //         "host": "y",
        //         "hostname": "y",
        //         "port": ""
        //     }
        // },
        // {
        //     "href": "file://y/",
        //     "new_value": "loc%41lhost",
        //     "expected": {
        //         "href": "file:///",
        //         "host": "",
        //         "hostname": "",
        //         "port": ""
        //     }
        // },
        // {
        //     "href": "file://hi/x",
        //     "new_value": "",
        //     "expected": {
        //         "href": "file:///x",
        //         "host": "",
        //         "hostname": "",
        //         "port": ""
        //     }
        // },
        // {
        //     "href": "sc://test@test/",
        //     "new_value": "",
        //     "expected": {
        //         "href": "sc://test@test/",
        //         "host": "test",
        //         "hostname": "test",
        //         "username": "test"
        //     }
        // },
        // {
        //     "href": "sc://test:12/",
        //     "new_value": "",
        //     "expected": {
        //         "href": "sc://test:12/",
        //         "host": "test:12",
        //         "hostname": "test",
        //         "port": "12"
        //     }
        // }
    ],
    "hostname": [
        {
            "comment": "Non-special scheme",
            "href": "sc://x/",
            "new_value": "\u0000",
            "expected": {
                "href": "sc://x/",
                "host": "x",
                "hostname": "x"
            }
        },
        // {
        //     "href": "sc://x/",
        //     "new_value": "\u0009",
        //     "expected": {
        //         "href": "sc:///",
        //         "host": "",
        //         "hostname": ""
        //     }
        // },
        // {
        //     "href": "sc://x/",
        //     "new_value": "\u000A",
        //     "expected": {
        //         "href": "sc:///",
        //         "host": "",
        //         "hostname": ""
        //     }
        // },
        // {
        //     "href": "sc://x/",
        //     "new_value": "\u000D",
        //     "expected": {
        //         "href": "sc:///",
        //         "host": "",
        //         "hostname": ""
        //     }
        // },
        {
            "href": "sc://x/",
            "new_value": " ",
            "expected": {
                "href": "sc://x/",
                "host": "x",
                "hostname": "x"
            }
        },
        // {
        //     "href": "sc://x/",
        //     "new_value": "#",
        //     "expected": {
        //         "href": "sc:///",
        //         "host": "",
        //         "hostname": ""
        //     }
        // },
        // {
        //     "href": "sc://x/",
        //     "new_value": "/",
        //     "expected": {
        //         "href": "sc:///",
        //         "host": "",
        //         "hostname": ""
        //     }
        // },
        // {
        //     "href": "sc://x/",
        //     "new_value": "?",
        //     "expected": {
        //         "href": "sc:///",
        //         "host": "",
        //         "hostname": ""
        //     }
        // },
        {
            "href": "sc://x/",
            "new_value": "@",
            "expected": {
                "href": "sc://x/",
                "host": "x",
                "hostname": "x"
            }
        },
        {
            "comment": "Cannot-be-a-base means no host",
            "href": "mailto:me@example.net",
            "new_value": "example.com",
            "expected": {
                "href": "mailto:me@example.net",
                "host": ""
            }
        },
        {
            "comment": "Cannot-be-a-base means no password",
            "href": "data:text/plain,Stuff",
            "new_value": "example.net",
            "expected": {
                "href": "data:text/plain,Stuff",
                "host": ""
            }
        },
        {
            "href": "http://example.net:8080",
            "new_value": "example.com",
            "expected": {
                "href": "http://example.com:8080/",
                "host": "example.com:8080",
                "hostname": "example.com",
                "port": "8080"
            }
        },
        {
            "comment": "The empty host is not valid for special schemes",
            "href": "http://example.net",
            "new_value": "",
            "expected": {
                "href": "http://example.net/",
                "host": "example.net"
            }
        },
        {
            "comment": "The empty host is OK for non-special schemes",
            "href": "view-source+http://example.net/foo",
            "new_value": "",
            "expected": {
                "href": "view-source+http:///foo",
                "host": ""
            }
        },
        {
            "comment": "Path-only URLs can gain a host",
            "href": "a:/foo",
            "new_value": "example.net",
            "expected": {
                "href": "a://example.net/foo",
                "host": "example.net"
            }
        },
        {
            "comment": "IPv4 address syntax is normalized",
            "href": "http://example.net:8080",
            "new_value": "0x7F000001",
            "expected": {
                "href": "http://127.0.0.1:8080/",
                "host": "127.0.0.1:8080",
                "hostname": "127.0.0.1",
                "port": "8080"
            }
        },
        {
            "comment": "IPv6 address syntax is normalized",
            "href": "http://example.net",
            "new_value": "[::0:01]",
            "expected": {
                "href": "http://[::1]/",
                "host": "[::1]",
                "hostname": "[::1]",
                "port": ""
            }
        },
        {
            "comment": "Stuff after a : delimiter is ignored",
            "href": "http://example.net/path",
            "new_value": "example.com:8080",
            "expected": {
                "href": "http://example.com/path",
                "host": "example.com",
                "hostname": "example.com",
                "port": ""
            }
        },
        {
            "comment": "Stuff after a : delimiter is ignored",
            "href": "http://example.net:8080/path",
            "new_value": "example.com:",
            "expected": {
                "href": "http://example.com:8080/path",
                "host": "example.com:8080",
                "hostname": "example.com",
                "port": "8080"
            }
        },
        {
            "comment": "Stuff after a / delimiter is ignored",
            "href": "http://example.net/path",
            "new_value": "example.com/stuff",
            "expected": {
                "href": "http://example.com/path",
                "host": "example.com",
                "hostname": "example.com",
                "port": ""
            }
        },
        {
            "comment": "Stuff after a ? delimiter is ignored",
            "href": "http://example.net/path",
            "new_value": "example.com?stuff",
            "expected": {
                "href": "http://example.com/path",
                "host": "example.com",
                "hostname": "example.com",
                "port": ""
            }
        },
        {
            "comment": "Stuff after a # delimiter is ignored",
            "href": "http://example.net/path",
            "new_value": "example.com#stuff",
            "expected": {
                "href": "http://example.com/path",
                "host": "example.com",
                "hostname": "example.com",
                "port": ""
            }
        },
        {
            "comment": "Stuff after a \\ delimiter is ignored for special schemes",
            "href": "http://example.net/path",
            "new_value": "example.com\\stuff",
            "expected": {
                "href": "http://example.com/path",
                "host": "example.com",
                "hostname": "example.com",
                "port": ""
            }
        },
        {
            "comment": "\\ is not a delimiter for non-special schemes, but still forbidden in hosts",
            "href": "view-source+http://example.net/path",
            "new_value": "example.com\\stuff",
            "expected": {
                "href": "view-source+http://example.net/path",
                "host": "example.net",
                "hostname": "example.net",
                "port": ""
            }
        },
        {
            "comment": "Broken IPv6",
            "href": "http://example.net/",
            "new_value": "[google.com]",
            "expected": {
                "href": "http://example.net/",
                "host": "example.net",
                "hostname": "example.net"
            }
        },
        // {
        //     "href": "http://example.net/",
        //     "new_value": "[::1.2.3.4x]",
        //     "expected": {
        //         "href": "http://example.net/",
        //         "host": "example.net",
        //         "hostname": "example.net"
        //     }
        // },
        // {
        //     "href": "http://example.net/",
        //     "new_value": "[::1.2.3.]",
        //     "expected": {
        //         "href": "http://example.net/",
        //         "host": "example.net",
        //         "hostname": "example.net"
        //     }
        // },
        // {
        //     "href": "http://example.net/",
        //     "new_value": "[::1.2.]",
        //     "expected": {
        //         "href": "http://example.net/",
        //         "host": "example.net",
        //         "hostname": "example.net"
        //     }
        // },
        // {
        //     "href": "http://example.net/",
        //     "new_value": "[::1.]",
        //     "expected": {
        //         "href": "http://example.net/",
        //         "host": "example.net",
        //         "hostname": "example.net"
        //     }
        // },
        // {
        //     "href": "file://y/",
        //     "new_value": "x:123",
        //     "expected": {
        //         "href": "file://y/",
        //         "host": "y",
        //         "hostname": "y",
        //         "port": ""
        //     }
        // },
        // {
        //     "href": "file://y/",
        //     "new_value": "loc%41lhost",
        //     "expected": {
        //         "href": "file:///",
        //         "host": "",
        //         "hostname": "",
        //         "port": ""
        //     }
        // },
        // {
        //     "href": "file://hi/x",
        //     "new_value": "",
        //     "expected": {
        //         "href": "file:///x",
        //         "host": "",
        //         "hostname": "",
        //         "port": ""
        //     }
        // },
        // {
        //     "href": "sc://test@test/",
        //     "new_value": "",
        //     "expected": {
        //         "href": "sc://test@test/",
        //         "host": "test",
        //         "hostname": "test",
        //         "username": "test"
        //     }
        // },
        // {
        //     "href": "sc://test:12/",
        //     "new_value": "",
        //     "expected": {
        //         "href": "sc://test:12/",
        //         "host": "test:12",
        //         "hostname": "test",
        //         "port": "12"
        //     }
        // }
    ],
    "port": [
        {
            "href": "http://example.net",
            "new_value": "8080",
            "expected": {
                "href": "http://example.net:8080/",
                "host": "example.net:8080",
                "hostname": "example.net",
                "port": "8080"
            }
        },
        {
            "comment": "Port number is removed if empty is the new value",
            "href": "http://example.net:8080",
            "new_value": "",
            "expected": {
                "href": "http://example.net/",
                "host": "example.net",
                "hostname": "example.net",
                "port": ""
            }
        },
        {
            "comment": "Default port number is removed",
            "href": "http://example.net:8080",
            "new_value": "80",
            "expected": {
                "href": "http://example.net/",
                "host": "example.net",
                "hostname": "example.net",
                "port": ""
            }
        },
        {
            "comment": "Default port number is removed",
            "href": "https://example.net:4433",
            "new_value": "443",
            "expected": {
                "href": "https://example.net/",
                "host": "example.net",
                "hostname": "example.net",
                "port": ""
            }
        },
        {
            "comment": "Default port number is only removed for the relevant scheme",
            "href": "https://example.net",
            "new_value": "80",
            "expected": {
                "href": "https://example.net:80/",
                "host": "example.net:80",
                "hostname": "example.net",
                "port": "80"
            }
        },
        {
            "comment": "Stuff after a / delimiter is ignored",
            "href": "http://example.net/path",
            "new_value": "8080/stuff",
            "expected": {
                "href": "http://example.net:8080/path",
                "host": "example.net:8080",
                "hostname": "example.net",
                "port": "8080"
            }
        },
        {
            "comment": "Stuff after a ? delimiter is ignored",
            "href": "http://example.net/path",
            "new_value": "8080?stuff",
            "expected": {
                "href": "http://example.net:8080/path",
                "host": "example.net:8080",
                "hostname": "example.net",
                "port": "8080"
            }
        },
        {
            "comment": "Stuff after a # delimiter is ignored",
            "href": "http://example.net/path",
            "new_value": "8080#stuff",
            "expected": {
                "href": "http://example.net:8080/path",
                "host": "example.net:8080",
                "hostname": "example.net",
                "port": "8080"
            }
        },
        {
            "comment": "Stuff after a \\ delimiter is ignored for special schemes",
            "href": "http://example.net/path",
            "new_value": "8080\\stuff",
            "expected": {
                "href": "http://example.net:8080/path",
                "host": "example.net:8080",
                "hostname": "example.net",
                "port": "8080"
            }
        },
        {
            "comment": "Anything other than ASCII digit stops the port parser in a setter but is not an error",
            "href": "view-source+http://example.net/path",
            "new_value": "8080stuff2",
            "expected": {
                "href": "view-source+http://example.net:8080/path",
                "host": "example.net:8080",
                "hostname": "example.net",
                "port": "8080"
            }
        },
        {
            "comment": "Anything other than ASCII digit stops the port parser in a setter but is not an error",
            "href": "http://example.net/path",
            "new_value": "8080stuff2",
            "expected": {
                "href": "http://example.net:8080/path",
                "host": "example.net:8080",
                "hostname": "example.net",
                "port": "8080"
            }
        },
        {
            "comment": "Anything other than ASCII digit stops the port parser in a setter but is not an error",
            "href": "http://example.net/path",
            "new_value": "8080+2",
            "expected": {
                "href": "http://example.net:8080/path",
                "host": "example.net:8080",
                "hostname": "example.net",
                "port": "8080"
            }
        },
        {
            "comment": "Port numbers are 16 bit integers",
            "href": "http://example.net/path",
            "new_value": "65535",
            "expected": {
                "href": "http://example.net:65535/path",
                "host": "example.net:65535",
                "hostname": "example.net",
                "port": "65535"
            }
        },
        {
            "comment": "Port numbers are 16 bit integers, overflowing is an error",
            "href": "http://example.net:8080/path",
            "new_value": "65536",
            "expected": {
                "href": "http://example.net:8080/path",
                "host": "example.net:8080",
                "hostname": "example.net",
                "port": "8080"
            }
        },
        {
            "comment": "Port numbers are 16 bit integers, overflowing is an error",
            "href": "non-special://example.net:8080/path",
            "new_value": "65536",
            "expected": {
                "href": "non-special://example.net:8080/path",
                "host": "example.net:8080",
                "hostname": "example.net",
                "port": "8080"
            }
        },
        {
            "href": "file://test/",
            "new_value": "12",
            "expected": {
                "href": "file://test/",
                "port": ""
            }
        },
        {
            "href": "file://localhost/",
            "new_value": "12",
            "expected": {
                "href": "file:///",
                "port": ""
            }
        },
        {
            "href": "non-base:value",
            "new_value": "12",
            "expected": {
                "href": "non-base:value",
                "port": ""
            }
        },
        {
            "href": "sc:///",
            "new_value": "12",
            "expected": {
                "href": "sc:///",
                "port": ""
            }
        },
        {
            "href": "sc://x/",
            "new_value": "12",
            "expected": {
                "href": "sc://x:12/",
                "port": "12"
            }
        },
        {
            "href": "javascript://x/",
            "new_value": "12",
            "expected": {
                "href": "javascript://x:12/",
                "port": "12"
            }
        }
    ],
    "pathname": [
        {
            "comment": "Cannot-be-a-base don’t have a path",
            "href": "mailto:me@example.net",
            "new_value": "/foo",
            "expected": {
                "href": "mailto:me@example.net",
                "pathname": "me@example.net"
            }
        },
        {
            "href": "unix:/run/foo.socket?timeout=10",
            "new_value": "/var/log/../run/bar.socket",
            "expected": {
                "href": "unix:/var/run/bar.socket?timeout=10",
                "pathname": "/var/run/bar.socket"
            }
        },
        {
            "href": "https://example.net#nav",
            "new_value": "home",
            "expected": {
                "href": "https://example.net/home#nav",
                "pathname": "/home"
            }
        },
        {
            "href": "https://example.net#nav",
            "new_value": "../home",
            "expected": {
                "href": "https://example.net/home#nav",
                "pathname": "/home"
            }
        },
        {
            "comment": "\\ is a segment delimiter for 'special' URLs",
            "href": "http://example.net/home?lang=fr#nav",
            "new_value": "\\a\\%2E\\b\\%2e.\\c",
            "expected": {
                "href": "http://example.net/a/c?lang=fr#nav",
                "pathname": "/a/c"
            }
        },
        {
            "comment": "\\ is *not* a segment delimiter for non-'special' URLs",
            "href": "view-source+http://example.net/home?lang=fr#nav",
            "new_value": "\\a\\%2E\\b\\%2e.\\c",
            "expected": {
                "href": "view-source+http://example.net/\\a\\%2E\\b\\%2e.\\c?lang=fr#nav",
                "pathname": "/\\a\\%2E\\b\\%2e.\\c"
            }
        },
        {
            "comment": "UTF-8 percent encoding with the default encode set. Tabs and newlines are removed.",
            "href": "a:/",
            "new_value": "\u0000\u0001\t\n\r\u001f !\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~\u007f\u0080\u0081Éé",
            "expected": {
                "href": "a:/%00%01%1F%20!%22%23$%&'()*+,-./09:;%3C=%3E%3F@AZ[\\]^_%60az%7B|%7D~%7F%C2%80%C2%81%C3%89%C3%A9",
                "pathname": "/%00%01%1F%20!%22%23$%&'()*+,-./09:;%3C=%3E%3F@AZ[\\]^_%60az%7B|%7D~%7F%C2%80%C2%81%C3%89%C3%A9"
            }
        },
        {
            "comment": "Bytes already percent-encoded are left as-is, including %2E outside dotted segments.",
            "href": "http://example.net",
            "new_value": "%2e%2E%c3%89té",
            "expected": {
                "href": "http://example.net/%2e%2E%c3%89t%C3%A9",
                "pathname": "/%2e%2E%c3%89t%C3%A9"
            }
        },
        {
            "comment": "? needs to be encoded",
            "href": "http://example.net",
            "new_value": "?",
            "expected": {
                "href": "http://example.net/%3F",
                "pathname": "/%3F"
            }
        },
        {
            "comment": "# needs to be encoded",
            "href": "http://example.net",
            "new_value": "#",
            "expected": {
                "href": "http://example.net/%23",
                "pathname": "/%23"
            }
        },
        {
            "comment": "? needs to be encoded, non-special scheme",
            "href": "sc://example.net",
            "new_value": "?",
            "expected": {
                "href": "sc://example.net/%3F",
                "pathname": "/%3F"
            }
        },
        {
            "comment": "# needs to be encoded, non-special scheme",
            "href": "sc://example.net",
            "new_value": "#",
            "expected": {
                "href": "sc://example.net/%23",
                "pathname": "/%23"
            }
        },
        {
            "comment": "File URLs and (back)slashes",
            "href": "file://monkey/",
            "new_value": "\\\\",
            "expected": {
                "href": "file://monkey/",
                "pathname": "/"
            }
        },
        {
            "comment": "File URLs and (back)slashes",
            "href": "file:///unicorn",
            "new_value": "//\\/",
            "expected": {
                "href": "file:///",
                "pathname": "/"
            }
        },
        {
            "comment": "File URLs and (back)slashes",
            "href": "file:///unicorn",
            "new_value": "//monkey/..//",
            "expected": {
                "href": "file:///",
                "pathname": "/"
            }
        }
    ],
    "search": [
        {
            "href": "https://example.net#nav",
            "new_value": "lang=fr",
            "expected": {
                "href": "https://example.net/?lang=fr#nav",
                "search": "?lang=fr"
            }
        },
        {
            "href": "https://example.net?lang=en-US#nav",
            "new_value": "lang=fr",
            "expected": {
                "href": "https://example.net/?lang=fr#nav",
                "search": "?lang=fr"
            }
        },
        {
            "href": "https://example.net?lang=en-US#nav",
            "new_value": "?lang=fr",
            "expected": {
                "href": "https://example.net/?lang=fr#nav",
                "search": "?lang=fr"
            }
        },
        {
            "href": "https://example.net?lang=en-US#nav",
            "new_value": "??lang=fr",
            "expected": {
                "href": "https://example.net/??lang=fr#nav",
                "search": "??lang=fr"
            }
        },
        {
            "href": "https://example.net?lang=en-US#nav",
            "new_value": "?",
            "expected": {
                "href": "https://example.net/?#nav",
                "search": ""
            }
        },
        {
            "href": "https://example.net?lang=en-US#nav",
            "new_value": "",
            "expected": {
                "href": "https://example.net/#nav",
                "search": ""
            }
        },
        {
            "href": "https://example.net?lang=en-US",
            "new_value": "",
            "expected": {
                "href": "https://example.net/",
                "search": ""
            }
        },
        {
            "href": "https://example.net",
            "new_value": "",
            "expected": {
                "href": "https://example.net/",
                "search": ""
            }
        },
        {
            "comment": "UTF-8 percent encoding with the query encode set. Tabs and newlines are removed.",
            "href": "a:/",
            "new_value": "\u0000\u0001\t\n\r\u001f !\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~\u007f\u0080\u0081Éé",
            "expected": {
                "href": "a:/?%00%01%1F%20!%22%23$%&'()*+,-./09:;%3C=%3E?@AZ[\\]^_`az{|}~%7F%C2%80%C2%81%C3%89%C3%A9",
                "search": "?%00%01%1F%20!%22%23$%&'()*+,-./09:;%3C=%3E?@AZ[\\]^_`az{|}~%7F%C2%80%C2%81%C3%89%C3%A9"
            }
        },
        {
            "comment": "Bytes already percent-encoded are left as-is",
            "href": "http://example.net",
            "new_value": "%c3%89té",
            "expected": {
                "href": "http://example.net/?%c3%89t%C3%A9",
                "search": "?%c3%89t%C3%A9"
            }
        }
    ],
    "hash": [
        {
            "href": "https://example.net",
            "new_value": "main",
            "expected": {
                "href": "https://example.net/#main",
                "hash": "#main"
            }
        },
        {
            "href": "https://example.net#nav",
            "new_value": "main",
            "expected": {
                "href": "https://example.net/#main",
                "hash": "#main"
            }
        },
        {
            "href": "https://example.net?lang=en-US",
            "new_value": "##nav",
            "expected": {
                "href": "https://example.net/?lang=en-US##nav",
                "hash": "##nav"
            }
        },
        {
            "href": "https://example.net?lang=en-US#nav",
            "new_value": "#main",
            "expected": {
                "href": "https://example.net/?lang=en-US#main",
                "hash": "#main"
            }
        },
        {
            "href": "https://example.net?lang=en-US#nav",
            "new_value": "#",
            "expected": {
                "href": "https://example.net/?lang=en-US#",
                "hash": ""
            }
        },
        {
            "href": "https://example.net?lang=en-US#nav",
            "new_value": "",
            "expected": {
                "href": "https://example.net/?lang=en-US",
                "hash": ""
            }
        },
        {
            "comment": "Simple percent-encoding; nuls, tabs, and newlines are removed",
            "href": "a:/",
            "new_value": "\u0000\u0001\t\n\r\u001f !\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~\u007f\u0080\u0081Éé",
            "expected": {
                "href": "a:/#%01%1F !\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~%7F%C2%80%C2%81%C3%89%C3%A9",
                "hash": "#%01%1F !\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~%7F%C2%80%C2%81%C3%89%C3%A9"
            }
        },
        {
            "comment": "Bytes already percent-encoded are left as-is",
            "href": "http://example.net",
            "new_value": "%c3%89té",
            "expected": {
                "href": "http://example.net/#%c3%89t%C3%A9",
                "hash": "#%c3%89t%C3%A9"
            }
        },
        // {
        //     "href": "javascript:alert(1)",
        //     "new_value": "castle",
        //     "expected": {
        //         "href": "javascript:alert(1)#castle",
        //         "hash": "#castle"
        //     }
        // }
    ]
}
