## The following file explains the working of the script to install docker on ubuntu bases system.

### Problem statement
With this script we are automating the task of manually installing and performing tasks to install docker in the linux nodes.

### Function
This script assumes that the target system is an Ubuntu linux server.

At the time of execution this script will first ask for 'sudo' permissions to install and modify the system settings. Once granted it will follow these steps.

- Step 1.
They script will update and pending updates follwed by installation of tools to install and pull docker certs.

- Step 2.
At Step 2 it will pull the docker cert from the main docker website,modify the file permissions and add this to the node's apt keyring so that the signature of the package can be verified.

- Step 3.
Here it will add the repo URL in the apt sources list. Based on the current ubuntu version it will add the version branch, once added it will also update the repo list to check if its working.

- Step 4.
At step 4 the script will finally install all the tools needed using apt.

- Step 5.
This step is performed to mittigate the issue of needing sudo to execute docker. Here the system will create a group for docker and the add the current user (*preferably SVC user*) to the docker group and create a new bash session.

### Recomandation
It is recomanded for te user to use service user to install docker(ie svc-docker-prod) and once the installation is done perform a full node restart so that the modifications can take effect properly. 

The helloworld container can also be installed to check if docker is working or not.

[HOME](../../teableofcontents.md)