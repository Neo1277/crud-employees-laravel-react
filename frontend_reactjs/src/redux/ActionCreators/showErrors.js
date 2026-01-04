
export default function showErrors(errors){
  var error_messages = '';
  if(errors.errors.identity_document){
    error_messages += errors.errors.identity_document + '\n\n';
  }

  if(errors.errors.first_last_name){
    error_messages += errors.errors.first_last_name + '\n\n';
  }

  if(errors.errors.second_last_name){
    error_messages += errors.errors.second_last_name + '\n\n';
  }

  if(errors.errors.first_name){
    error_messages += errors.errors.first_name + '\n\n';
  }

  if(errors.errors.other_names){
    error_messages += errors.errors.other_names + '\n\n';
  }
  
  if(errors.errors.email){
    error_messages += errors.errors.email + '\n\n';
  }
  
  if(errors.errors.country){
    error_messages += errors.errors.country + '\n\n';
  }
  
  if(errors.errors.date_of_entry){
    error_messages += errors.errors.date_of_entry + '\n\n';
  }
  
  if(errors.errors.status){
    error_messages += errors.errors.status + '\n\n';
  }
  
  if(errors.errors.type_of_identity_document_id){
    error_messages += errors.errors.type_of_identity_document_id + '\n\n';
  }
  
  if(errors.errors.area_id){
    error_messages += errors.errors.area_id + '\n\n';
  }

  alert(error_messages);

}