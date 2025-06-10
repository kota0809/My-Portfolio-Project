
public without sharing class NoteTakingController {
    @AuraEnabled
    public Static boolean createNoteRecord( String title, String description) {

        try{
            if(!String.isBlank(title)){ 
            My_Note__c note = new My_note__c();
            note.Name = title;
            note.Note_Description__c = description;

            insert note;
            return true;
        }
            return false;
           
        }catch(Exception e){
             throw new AuraHandledException(e.getMessage());
        }

    }

    @AuraEnabled(cacheable=true)
    public static List<My_Note__c> getNotes(){
         return [SELECT ID, Name, Note_Description__c, LastModifiedDate FROM My_Note__c order by LastModifiedDate Desc];
    }

    @AuraEnabled
    public static boolean updateNoteRecord( String NoteId, String title, String description){
        try {
            if(!String.isBlank(NoteId)){

                My_Note__c note = [SELECT Id, Name, Note_Description__c FROM My_Note__c WHERE Id =:NoteId];
                note.Name = title;
                note.Note_Description__c = description;
                update note;
                return true;
            }

            return false;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static boolean  deleteNoteRecord( String noteId){

        try {

            if(!String.isBlank(noteId)){
                My_Note__c note = new My_Note__c(Id = noteId);

                delete note;
                return true;
            }
            return false;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}