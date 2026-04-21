const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const sourceDir = path.join(projectRoot, 'cloudfunctions')

function ensureDirSync(dirPath) {
    if (fs.existsSync(dirPath)) {
        return
    }

    const parentDir = path.dirname(dirPath)
    if (parentDir !== dirPath) {
        ensureDirSync(parentDir)
    }

    fs.mkdirSync(dirPath)
}

function removeDirSync(dirPath) {
    if (!fs.existsSync(dirPath)) {
        return
    }

    for (const entry of fs.readdirSync(dirPath)) {
        const entryPath = path.join(dirPath, entry)
        const entryStats = fs.lstatSync(entryPath)

        if (entryStats.isDirectory()) {
            removeDirSync(entryPath)
            continue
        }

        fs.unlinkSync(entryPath)
    }

    fs.rmdirSync(dirPath)
}

function copyDirSync(fromDir, toDir) {
    if (!fs.existsSync(fromDir)) {
        return
    }

    ensureDirSync(toDir)

    for (const entry of fs.readdirSync(fromDir)) {
        const fromPath = path.join(fromDir, entry)
        const toPath = path.join(toDir, entry)
        const entryStats = fs.lstatSync(fromPath)

        if (entryStats.isDirectory()) {
            copyDirSync(fromPath, toPath)
            continue
        }

        ensureDirSync(path.dirname(toPath))
        fs.copyFileSync(fromPath, toPath)
    }
}

function resolveTargetDir() {
    const platform = process.env.UNI_PLATFORM

    if (!platform) {
        return null
    }

    return path.join(
        projectRoot,
        'unpackage',
        'dist',
        process.env.NODE_ENV === 'production' ? 'build' : 'dev',
        platform,
        'cloudfunctions'
    )
}

function copyCloudFunctions() {
    const targetDir = resolveTargetDir()

    if (!targetDir) {
        return
    }

    removeDirSync(targetDir)
    copyDirSync(sourceDir, targetDir)
}

class CopyCloudFunctionsPlugin {
    apply(compiler) {
        if (compiler.hooks && compiler.hooks.afterEmit) {
            compiler.hooks.afterEmit.tap('CopyCloudFunctionsPlugin', copyCloudFunctions)
            return
        }

        compiler.plugin('after-emit', (compilation, callback) => {
            try {
                copyCloudFunctions()
                callback()
            } catch (error) {
                callback(error)
            }
        })
    }
}

module.exports = CopyCloudFunctionsPlugin
