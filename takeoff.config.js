module.exports = environment => [
    { cmd: `git submodule init`, message: `Initialising submodules`, cwd: `envs/${environment}` },
    { cmd: `git submodule update`, message: `Cloning submodules`, cwd: `envs/${environment}` },
    { cmd: `lerna bootstrap`, message: 'Bootstrapping environments', cwd: `envs/${environment}` },
    {
        cmd: `docker-compose -f docker/docker-compose.yml build --no-cache`,
        message: 'Running Docker Compose Build',
        cwd: `envs/${environment}`
    },
    {
        cmd: `docker-compose -f docker/docker-compose.yml up -d db`,
        message: 'Triggering database creation',
        cwd: `envs/${environment}`
    },
    {
        cmd: `docker-compose -f docker/docker-compose.yml stop db`,
        message: 'Shutting down database',
        cwd: `envs/${environment}`
    }
];