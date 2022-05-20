function InputStream(input) {
    var pos = 0, line = 1, col = 0;
    return {
        next: next,
        peek: peek,
        eof: eof,
        croak: croak,
    };
    function next() {
        var ch = input.charAt(pos++);
        if (ch == "\n") line++, col = 0; else col++;
        return ch;
    }
    function peek() {
        return input.charAt(pos);
    }
    function eof() {
        return peek() == "";
    }
    function croak(msg) {
        throw new Error(msg + " (" + line + ":" + col + ")");
    }
}

/**
 * @param {InputStream} input
 */
function TokenStream(input) {
  var current = null;
  var keywords = " state branch true false ";
  return {
    next: next,
    peek: peek,
    eof: eof,
    croak: input.croak,
  }

  function isKeyword(x) { return keywords.indexOf(` ${x} `) >= 0; }
  function isDigit(ch) { return /[0-9]/i.test(ch); }
  function isIdStart(ch) { return /[a-z_$]/i.test(ch); }
  function isId(ch) { return isIdStart(ch) || "-0123456789".includes(ch); }
  function isOpChar(ch) { return "=+-*/%<>$|!".includes(ch); }
  function isPunc(ch) { return ",;()[]{}".includes(ch); }
  function isWhitespace(ch) { return " \n\t".includes(ch); }

  function readWhile(predicate) {
    let str = "";
    while (!input.eof && predicate(input.peek())) { str += input.next(); }
    return str;
  }

  function readNumber() {
    let hasDot = false;
    let number = readWhile(function (ch) {
      if (ch === ".") {
        if (hasDot) return false;
        hasDot = true;
        return true;
      }
      return isDigit(ch);
    });
    return {type: "num", value: parseFloat(number)};
  }

  function readIdent() {
    let id = readWhile(isId);
    return {
      type: isKeyword(id) ? "kw" : "var",
      value: id,
    };
  }

  function readEscaped(end) {
    let escaped = false, str = "";
    input.next();
    while (!input.eof()) {
      let ch = input.next();
      if (escaped) {
        str += ch;
        escaped = false;
      } else if (cg === "\\") {
        escaped = true;
      } else if (ch === end) {
        break;
      } else {
        str += ch;
      }
    }
    return str;
  }

  function readString() {
    return {type: "str", value: readEscaped('"')};
  }

  function skipComment() {
    readWhile((ch) => { return ch != "\n"; });
    input.next();
  }

  function readNext() {
    readWhile(isWhitespace);

    if (input.eof()) return null;
    var ch = input.peek();

    if (ch === "#") {
      skipComment();
      return readNext();
    }
    if (ch === '"') return readString();
    if (isDigit(ch)) return readNumber();
    if (isIdStart(ch)) return readIdent();
    if (isPunc(ch)) return {
      type: "punc",
      value: input.next(),
    };
    if (isOpChar(ch)) return {
      type: "op",
      value: readWhile(isOpChar),
    }

    input.croak(`Can't read the character '${ch}'`);
  }

  function peek() { return current || (current = readNext()); }
  function next() {
    let tok = current;
    current = null;
    return tok || readNext();
  }
  function eof() { return peek() == null; }
}

function Parser() {
  function delimited(start, stop, separator, parser) {
    let a = [], first = true;
    skipPunc(start);
    while (!input.eof()) {
      if (isPunc(stop)) break;
      if (first) first = false; else skipPunc(separator);
      if (isPunc(stop)) break;
      a.push(parser());
    }
    skipPunc(stop);
    return a;
  }

  function parseBranch() {
    return {
      type: "branch",
      name: "",
      body: parseBranchBlock(),
    };
  }
  function parseCallback() {
    return {
      type: "call",
      args: delimited("(", ")", ",", parseVarname),
      branches: parseFuncBlock(),
    }
  }

  function parseAtom() {
    return maybeCall(() => {
      if (isPunc("(")) {
        input.next();
        let exp = parseExpression();
        skipPunc(")");
        return exp;
      }

      if (isKw("true") || isKw("false")) return parseBool();
      if (isKw("branch")) {
        input.next();
        return parseBranch();
      }
      let tok = input.next();

    })
  }

  function parseToplevel() {
    var tree = [];
    while (!input.eof()) {
      tree.push(parseExpression());
      if (!input.eof()) skipPunc(";");
    }
    return {
      type: "branch",
      name: "$tree",
      body: tree,
    };
  }
}
