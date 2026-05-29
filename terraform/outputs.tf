# devops/terraform/outputs.tf

output "server_public_ip" {
  description = "The public IP address of your new VM."
  value       = oci_core_instance.app_server.public_ip
}

output "ssh_command" {
  description = "Command to SSH into your server."
  value       = "ssh -i ~/.ssh/id_rsa ubuntu@${oci_core_instance.app_server.public_ip}"
}