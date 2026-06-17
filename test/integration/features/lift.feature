Feature: Lift

  Scenario: Package
    Given the package exists
    When the project is lifted
    Then the npm badge is defined for the registry
