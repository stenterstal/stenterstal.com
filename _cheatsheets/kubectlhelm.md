---
published: true
title: "Kubectl / Helm"
thumbnail: "/assets/img/cheatsheet_icons/kubectl.png"
---

### Kubectl contexts
```shell 
kubectl config get-contexts               // Display list of contexts
```
```shell 
kubectl config current-context            // Display current context
```
```shell 
kubectl config use-context <context>      // Set the default context to <context>
```

### Kubectl Copy
Copy file from pod to local machine and vice versa
```shell 
kubectl cp /home/sten/Downloads/<newfile> <pod-name>:/path/<file>   // Copy file from local machine to pod
```
```shell 
kubectl cp <pod-name>:/path/<file> /home/sten/Downloads/<newfile>   // Copy file from pod to local machine
```