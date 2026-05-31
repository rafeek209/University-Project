variable "tenancy_ocid" {
  type        = string
  description = "The OCID of your Oracle Cloud tenancy account"
  validation {
    condition     = can(regex("^ocid1\\.tenancy\\.", var.tenancy_ocid))
    error_message = "tenancy_ocid must be a valid tenancy OCID starting with ocid1.tenancy."
  }
}

variable "user_ocid" {
  type        = string
  description = "The OCID of your Oracle Cloud IAM user"
  validation {
    condition     = can(regex("^ocid1\\.user\\.", var.user_ocid))
    error_message = "user_ocid must be a valid user OCID starting with ocid1.user."
  }
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
  validation {
    condition     = can(regex("^ocid1\\.compartment\\.", var.compartment_id))
    error_message = "compartment_id must be a valid compartment OCID starting with ocid1.compartment."
  }
}

variable "region" {
  type        = string
  description = "The OCI region"
  default     = "eu-frankfurt-1" 
}