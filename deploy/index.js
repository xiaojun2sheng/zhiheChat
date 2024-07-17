import client from 'scp2'
import chalk from 'chalk'
import ora from 'ora'

const spinner = ora('正在自动部署中...')
spinner.start()

let testHost = 
{
    host: '154.3.0.117',
    port: '11531',
    username: '154_3_0_117',
    password: 'AGmimZEy3a4y',
    path: '/www/wwwroot/154.3.0.117'
    // 154.3.0.117
    // root
    // Ca3tz2PPxjPqIwEu
}

client.scp('./dist',
    testHost,
    (err) => {
        spinner.stop();
        if (!err) {
            console.log(chalk.green('项目自动化部署完成'))
        } else {
            console.log(chalk.red('项目自动化部署出现异常', err))
        }
    }
)