Feature: Content items creation
  As an administrator
  In order to manage content to my site
  I want to create, edit, copy and move content items.
  
Background:
      Given I open Login page in admin SiteAccess
      And I am logged as admin

@javascript @APIUser:admin @IbexaOSS @IbexaContent @IbexaExperience @IbexaCommerce
Scenario: Content moving can be cancelled
  Given I create "Folder" Content items
    | name               | short_name          | parentPath        | language |
    | ContentManagement  | ContentManagement   | root              | eng-GB   |
    | FolderToCancelMove | FolderToCancelMove  | ContentManagement | eng-GB   |
  And I'm on Content view Page for "ContentManagement/FolderToCancelMove"
  When I click on the edit action bar button "Move"
    And I select content "Media" through UDW
    And I close the UDW window
  Then I should be on Content view Page for "ContentManagement/FolderToCancelMove"

@javascript @APIUser:admin @IbexaOSS @IbexaContent @IbexaExperience @IbexaCommerce
Scenario: Content can be moved
  Given I create "Folder" Content items
    | name               | short_name        | parentPath        | language |
    | ContentManagement  | ContentManagement | root              | eng-GB   |
    | FolderToMove       | FolderToMove      | ContentManagement | eng-GB   |
  And I'm on Content view Page for "ContentManagement/FolderToMove"
  When I click on the edit action bar button "Move"
    And I select content "Media/Files" through UDW
    And I confirm the selection in UDW
  Then success notification that "'FolderToMove' moved to 'Files'" appears
    And I should be on Content view Page for "Media/Files/FolderToMove"
    And I'm on Content view Page for "ContentManagement"
    And there's no "FolderToMove" "Folder" on Subitems list

@javascript @APIUser:admin @IbexaOSS @IbexaContent @IbexaExperience @IbexaCommerce
Scenario: Content copying can be cancelled
  Given I create "Folder" Content items
    | name               | short_name         | parentPath        | language |
    | ContentManagement  | ContentManagement  | root              | eng-GB   |
    | FolderToCopyCancel | FolderToCopyCancel | ContentManagement | eng-GB   |
  And I'm on Content view Page for "ContentManagement/FolderToCopyCancel"
  When I click on the edit action bar button "Copy"
    And I select content "Media" through UDW
    And I close the UDW window
  Then I should be on Content view Page for "ContentManagement/FolderToCopyCancel"

@javascript @APIUser:admin @IbexaOSS @IbexaContent @IbexaExperience @IbexaCommerce
Scenario: Content can be copied
  Given I create "Folder" Content items
    | name               | short_name         | parentPath        | language |
    | ContentManagement  | ContentManagement  | root              | eng-GB   |
    | FolderToCopy       | FolderToCopy       | ContentManagement | eng-GB   |
  And I'm on Content view Page for "ContentManagement/FolderToCopy"
  When I click on the edit action bar button "Copy"
  And I select content "Media/Files" through UDW
    And I confirm the selection in UDW
  Then success notification that "'FolderToCopy' copied to 'Files'" appears
    And I should be on Content view Page for "Media/Files/FolderToCopy"
    And I'm on Content view Page for "ContentManagement"
    And there's a "FolderToCopy" "Folder" on Subitems list

  @javascript @APIUser:admin @IbexaOSS @IbexaContent @IbexaExperience @IbexaCommerce
  Scenario: Subtree copying can be cancelled
    Given I create "Folder" Content items
      | name                      | short_name                | parentPath        | language |
      | ContentManagement         | ContentManagement         | root              | eng-GB   |
      | FolderToSubtreeCopyCancel | FolderToSubtreeCopyCancel | ContentManagement | eng-GB   |
    And I'm on Content view Page for "ContentManagement/FolderToSubtreeCopyCancel"
    When I click on the edit action bar button "Copy Subtree"
    And I select content "Media" through UDW
    And I close the UDW window
    Then I should be on Content view Page for "ContentManagement/FolderToSubtreeCopyCancel"

  @javascript @APIUser:admin @IbexaOSS @IbexaContent @IbexaExperience @IbexaCommerce
  Scenario: Subtree can be copied
    Given I create "Folder" Content items
      | name                      | short_name                | parentPath        | language |
      | ContentManagement         | ContentManagement         | root              | eng-GB   |
      | FolderToCopyToSubtreeCopy | FolderToCopyToSubtreeCopy | ContentManagement | eng-GB   |
    And I'm on Content view Page for "ContentManagement/FolderToCopyToSubtreeCopy"
    When I click on the edit action bar button "Copy Subtree"
    And I select content "Media" through UDW
    And I confirm the selection in UDW
    Then success notification that "Subtree 'FolderToSubtreeCopy' copied to Location 'Media'" appears
    And I should be on Content view Page for "Media/Files/FolderToSubtreeCopy"
    And I'm on Content view Page for "ContentManagement"
    And there's a "FolderToSubtreeCopy" "Folder" on Subitems list
