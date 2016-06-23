var B = '\033[1m';
var R = ' \033[0m';
var Y = '\033[33m';

function Formatter() {
}

Formatter.prototype.format = function (failures) {
  var output = "";

  if(failures.length === 0){
    return false;
  }

  const fileName = failures[0].getFileName();
  output += '   ' + B + Y + fileName + R + '\n';

  const fileLines = failures.map(function (failure) {
    const fail = failure.getFailure();
    const rule = failure.getRuleName();
    const position = failure.getStartPosition().getLineAndCharacter();

    const line = position.line + 1;
    const character = position.character + 1;

    const positionTuple = B + "[" + line + ", " + character + "]" + R;

    return '-- ' + positionTuple + "- " + fail;
  });

  output += fileLines.join("\n") + '\n';

  return output + "\n";
};

exports.Formatter = Formatter;
