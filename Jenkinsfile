pipeline {
    agent any

    stages {
        stage('Clone Branches') {
            steps {
               bat 'git pull origin master'
            }
        }
        // stage('NPM Install for UI') {
        //     steps {
        //         dir("${JENKINS_HOME}\\workspace\\fseproject_master\\ui"){
        //             bat 'npm install'
        //         } 
        //     }
        // }
        // stage('NPM Install for Middleware') {
        //     steps {
        //         dir("${JENKINS_HOME}\\workspace\\fseproject_master\\middleware"){
        //             bat 'npm install'
        //         }                
        //     }
        // }
    }
}