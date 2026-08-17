# formzk AI coding skills

Portable [Claude Code skills](https://code.claude.com/docs/en/skills) that teach an AI coding agent how to implement formzk correctly — the registry pattern, type augmentation, adapter selection, and the gotchas.

Full guide: **https://louiskhenghao.github.io/formzk/docs/ai-skills**

| Skill | Use it for |
| --- | --- |
| [`formzk-implement`](./formzk-implement) | Building forms in your app. Detects your UI kit: MUI → `@formzk/mui`, Tamagui → `@formzk/tamagui`, anything else → `@formzk/core` with your own components |
| [`formzk-custom-component`](./formzk-custom-component) | Wrapping any component (Chakra, antd, shadcn, custom) to formzk's `value`/`onChange` contract and registering it with typed props |
| [`formzk-new-adapter`](./formzk-new-adapter) | Contributing a new `@formzk/<kit>` adapter package to this monorepo |

## Install into your app

Copy the skill folder(s) you want into your project's `.claude/skills/`:

```bash
# per-project (recommended)
npx degit louiskhenghao/formzk/skills/formzk-implement .claude/skills/formzk-implement
npx degit louiskhenghao/formzk/skills/formzk-custom-component .claude/skills/formzk-custom-component

# or globally, for all your projects
npx degit louiskhenghao/formzk/skills/formzk-implement ~/.claude/skills/formzk-implement
```

Then just ask Claude Code things like *"add a signup form with formzk"* — the skill triggers automatically.

`formzk-new-adapter` is meant for working inside a clone of this repo (it's already active here — see below).

## Notes

- Each skill is self-contained; install only what you need.
- Skills follow the standard `SKILL.md` + frontmatter format, so other agents that read that format can use them too.
- In this repo, `.claude/skills/` contains symlinks to `skills/` so contributors get the skills automatically. The symlinks may appear broken on Windows checkouts without symlink support — app developers should use the copy-install above instead.
