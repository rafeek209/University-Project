# devops/terraform/main.tf

provider "oci" {
  tenancy_ocid     = var.tenancy_ocid
  user_ocid        = var.user_ocid
  fingerprint      = var.fingerprint
  private_key_path = var.private_key_path
  region           = var.region
}

# --- Data Blocks ---
data "oci_identity_availability_domains" "ads" {
  compartment_id = var.compartment_id
}

data "oci_core_images" "ubuntu" {
  compartment_id           = var.compartment_id
  operating_system         = "Canonical Ubuntu"
  operating_system_version = "22.04"
  shape                    = "VM.Standard.E2.1.Micro"
  sort_by                  = "TIMECREATED"
  sort_order               = "DESC"
}

# --- Networking ---
resource "oci_core_vcn" "main_vcn" {
  cidr_block     = "10.0.0.0/16"
  compartment_id = var.compartment_id
  display_name   = "university_project_vcn"
}

resource "oci_core_internet_gateway" "main_igw" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.main_vcn.id
  enabled        = true
  display_name   = "main_internet_gateway"
}

resource "oci_core_default_route_table" "main_route_table" {
  manage_default_resource_id = oci_core_vcn.main_vcn.default_route_table_id

  route_rules {
    network_entity_id = oci_core_internet_gateway.main_igw.id
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
  }
}

resource "oci_core_default_security_list" "main_security_list" {
  manage_default_resource_id = oci_core_vcn.main_vcn.default_security_list_id

  egress_security_rules {
    destination = "0.0.0.0/0"
    protocol    = "all"
  }

  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"
    tcp_options { max = 22, min = 22 }
  }

  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"
    tcp_options { max = 80, min = 80 }
  }

  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"
    tcp_options { max = 5000, min = 5000 }
  }
}

resource "oci_core_subnet" "main_subnet" {
  cidr_block     = "10.0.1.0/24"
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.main_vcn.id
  display_name   = "public_subnet"
}

# --- Compute Instance ---
resource "oci_core_instance" "app_server" {
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
  compartment_id      = var.compartment_id
  shape               = "VM.Standard.E2.1.Micro"
  display_name        = "university_app_server"
  
  create_vnic_details {
    subnet_id        = oci_core_subnet.main_subnet.id
    assign_public_ip = true
  }

  source_details {
    source_type = "image"
    source_id   = data.oci_core_images.ubuntu.images[0].id 
  }

  metadata = {
    ssh_authorized_keys = file("~/.ssh/id_rsa.pub") 
  }
}