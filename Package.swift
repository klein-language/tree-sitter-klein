// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterKlein",
    products: [
        .library(name: "TreeSitterKlein", targets: ["TreeSitterKlein"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterKlein",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterKleinTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterKlein",
            ],
            path: "bindings/swift/TreeSitterKleinTests"
        )
    ],
    cLanguageStandard: .c11
)
