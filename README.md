# Idea launcher

It will open your idea project from your terminal.

## Install

```shell
npm install -g idea_launcher
```

## Usage

In your project directory:

```shell
oidea
```

If you prefer open an specified IDE can you use the -a parameter:

```shell
oidea -a IDE_NAME
```

### Values

| IDE to open     | IDE_NAME value   |
| --------------- | ---------------- |
| IntelliJ Idea   | intellij         |
| Webstorm        | webstorm         |
| PhpStorm        | phpstorm         |
| RubyMine        | rubymine         |
| AndroidStudio   | android          |
| PyCharm         | pycharm          |

### Example

To run Webstorm

```shell
oidea -a webstorm
```

## Other commands

| -u | Update the installed applications paths |
| -d | Update the default application |

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my_feature_branch`)
3. Commit your changes (`git commit -am 'Added a sweet feature'`)
4. Push to the branch (`git push origin my_feature_branch`)
5. Create new Pull Request

## TODO

- More sources matching
- Windows, Unix compatibility
