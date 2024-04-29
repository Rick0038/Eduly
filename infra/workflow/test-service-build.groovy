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
                sh 'Cleaning area'
                cleanWs()
            }
        }
        stage('Checkout') {
            steps {
                git branch: 'sagnik-dev', credentialsId: '85cdd362-476e-4ab9-bd31-cc0ffc36bae8', changelog: false, poll: false, url: 'https://github.com/Rick0038/GDSD-SS2024-Project.git'
                sh 'echo code pulled'
                sh 'ls'
            }
        }
        stage('Compile frontend') {
            steps {
                // Compile the code
                dir('frontend'){
                    sh 'ls'
                    sh 'echo I am in frontend'
                }
            }
        }
        stage('Compile backend') {
            steps {
                // Compile the code
                dir('backend'){
                    sh 'ls'
                    sh 'echo I am in backend'
                }
            }
        }
        stage('Docker') {
            steps {
                sh 'docker ps'
            }
        }
    }
}
