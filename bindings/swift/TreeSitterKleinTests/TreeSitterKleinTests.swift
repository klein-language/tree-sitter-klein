import XCTest
import SwiftTreeSitter
import TreeSitterKlein

final class TreeSitterKleinTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_klein())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Klein grammar")
    }
}
