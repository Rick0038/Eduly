pipeline {
    agent any
    tools{
        maven '3.9.6'
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
