module.exports = {
  rules: {
    "no-empty-first-line": {
      meta: {
        type: "layout",
        docs: {
          description: "disallow empty line at the beginning of files",
          category: "Stylistic Issues"
        },
        fixable: "whitespace",
        schema: []
      },
      create(context) {
        const sourceCode = context.getSourceCode();
        
        return {
          Program(node) {
            const text = sourceCode.getText();
            
            if (text.length === 0) {
              return;
            }
            
            const lines = text.split(/\r?\n/);
            
            if (lines.length > 0 && lines[0].trim() === "") {
              context.report({
                node,
                loc: {
                  start: { line: 1, column: 0 },
                  end: { line: 1, column: lines[0].length }
                },
                message: "File should not start with an empty line.",
                fix(fixer) {
                  const firstLineEnd = lines[0].length + (text.includes('\r\n') ? 2 : 1);
                  return fixer.removeRange([0, firstLineEnd]);
                }
              });
            }
          }
        };
      }
    }
  }
};