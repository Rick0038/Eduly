pipeline {
    agent any
    tools{
        node 22.0.0
//      this is only needed of docker plugin is used  
//      'org.jenkinsci.plugins.docker.commons.tools.DockerTool' 'docker'
    }

    stages {
        stage('Clean') {
            steps {
                sh 'echo hello'
            }
        }
    }
}
