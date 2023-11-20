# Descent Protocol

## CONTRIBUTING

Welcome and thank you for considering contributing to our project! When contributing to this repository, please follow these simple guidelines;

- Run our test suite `yarn run test` to avoid regressions or bugs
- Make sure you run `yarn lint` to check linting problems.
- Before adding any code dependencies, check with the maintainers if this is okay.
- Write properly formatted comments in NATSPEC: they should be English sentences, eg:

        /// Return the current LOCAL time.

- Follow the guidelines when proposing code changes (see below).
- Write properly formatted git commits (see below).
- Sign all your commits with your public key, using `git commit -S`

## Proposing changes

When proposing changes via a pull-request or patch:

- Isolate changes in separate commits to make the review process easier.
- Don't make unrelated changes, unless it happens to be an obvious improvement to
  code you are touching anyway ("boyscout rule").
- Rebase on `master` when needed.
- Keep your changesets small, specific and uncontroversial, so that they can be
  merged more quickly.
- If the change is substantial or requires re-architecting certain parts of the
  codebase, write a proposal in English first, provide diagrams if necessary and get consensus on that before
  proposing the code changes.

## Writing Git commit messages

A properly formed git commit subject line should always be able to complete the
following sentence:

     If applied, this commit will _____

In addition, it should be capitalized and _must not_ include a period.

For example, the following message is well formed:

     Add support for .pdf files

While these ones are **not**: `Adding support for .pdf files`,
`Added support for .pdf files`.

When it comes to formatting, here's a model git commit message[1]:

     Capitalized, short (50 chars or less) summary

     More detailed explanatory text, if necessary.  Wrap it to about 72
     characters or so.  In some contexts, the first line is treated as the
     subject of an email and the rest of the text as the body.  The blank
     line separating the summary from the body is critical (unless you omit
     the body entirely); tools like rebase can get confused if you run the
     two together.

     Write your commit message in the imperative: "Fix bug" and not "Fixed bug"
     or "Fixes bug."  This convention matches up with commit messages generated
     by commands like git merge and git revert.

     Further paragraphs come after blank lines.

     - Bullet points are okay, too.

     - Typically a hyphen or asterisk is used for the bullet, followed by a
       single space, with blank lines in between, but conventions vary here.

     - Use a hanging indent.

---
