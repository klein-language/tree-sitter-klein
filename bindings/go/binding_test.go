package tree_sitter_klein_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_klein "github.com/klein-language/tree-sitter-klein/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_klein.Language())
	if language == nil {
		t.Errorf("Error loading Klein grammar")
	}
}
