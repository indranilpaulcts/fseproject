pipeline {
    agent any

    stages {
        stage('Pull Master') {
            steps {
               bat 'git pull origin master'
            }
        }
        stage('NPM Install for UI') {
            steps {
                dir("${JENKINS_HOME}\\workspace\\fsecapsule\\ui"){
                    bat 'npm install'
                } 
            }
        }
        stage('NPM Install for Middleware') {
            steps {
                dir("${JENKINS_HOME}\\workspace\\fsecapsule\\middleware"){
                    bat 'npm install'
                }                
            }
        }
        stage('Create Build') {
            steps {
                dir("${JENKINS_HOME}\\workspace\\fsecapsule\\ui"){
                    bat 'npm run ng -- build --prod'
                }                
            }
        }
    }
}
