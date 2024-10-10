from google.cloud import secretmanager

def recaptcha_secret(project_id: str) -> str:
    """
    Access secret from GCP.

    :param name: name of the secret (e.g. marino-emissions-app-recaptcha)
    :param project_id: id of the project (eg marino-emissions-app
    :returns: secret
    """
    # Create the Secret Manager client
    client = secretmanager.SecretManagerServiceClient()

    # Build the resource name of the secret version
    secret_version_name = f"projects/{project_id}/secrets/marino-emissions-app-recaptcha/versions/latest"

    # Access the secret version
    response = client.access_secret_version(name=secret_version_name)

    # Return the decoded payload
    secret_data = response.payload.data.decode('UTF-8')
    return secret_data
