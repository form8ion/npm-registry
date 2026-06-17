Feature: Lift

  Scenario: Public Package
    Given the package exists
    And the package access level is "public"
    When the project is lifted
    Then the npm badge is defined for the registry

  Scenario: Restricted Package
    Given the package exists
    And the package access level is "restricted"
    When the project is lifted
    Then the npm badge is not defined

  Scenario: Package w/o publishConfig
    Given the package exists
    When the project is lifted
    Then the npm badge is not defined
