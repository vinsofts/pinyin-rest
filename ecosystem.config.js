const source_profile = 'source $HOME/.profile && '

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // First application
    {
      name      : 'pinyin-rest',
      script    : 'index.js',
      env: {
        PORT: 2000
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'pepe',
      host : 'scw.pepebecker.com',
      ref  : 'origin/master',
      repo : 'https://github.com/pepebecker/pinyin-rest.git',
      path : '/home/pepe/apps/production/pinyin-rest',
      'post-deploy' : source_profile + 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'pepe',
      host : 'scw.pepebecker.com',
      ref  : 'origin/master',
      repo : 'https://github.com/pepebecker/pinyin-rest.git',
      path : '/home/pepe/apps/development/pinyin-rest',
      'post-deploy': source_profile + 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
