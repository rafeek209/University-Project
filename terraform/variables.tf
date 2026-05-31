# devops/terraform/variables.tf

variable "tenancy_ocid" {
  type        = string
  description = "The OCID of your Oracle Cloud tenancy account"
}

variable "user_ocid" {
  type        = string
  description = "The OCID of your Oracle Cloud IAM user"
}

variable "fingerprint" {
  type        = string
  description = "The fingerprint of the API key"
}

variable "private_key_path" {
  type        = string
  description = "Path to your OCI API private key"
  default     = "~/.oci/oci_api_key.pem"
}

variable "ssh_public_key_path" {
  type        = string
  description = "Path to your SSH public key file for OCI instance access"
  default     = "~/.ssh/id_rsa.pub"
}

variable "compartment_id" {
  type        = string
  description = "The Oracle Compartment ID"
}

variable "region" {
  type        = string
  description = "The OCI region"
  default     = "us-ashburn-1" # Change this if your region is different
}